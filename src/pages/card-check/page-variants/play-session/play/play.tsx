import React, { useEffect, useState } from 'react'

import { animated, useTransition } from '@react-spring/web'
import { observer } from 'mobx-react-lite'
import { ArrowLeft } from 'react-bootstrap-icons'
import styled from 'styled-components'

import { useCheckStore } from 'pages/card-check/original-content'

import { Button } from 'components/buttons/button'

import { CardCheckBlockTemplate } from '../../components/check-block-template'
import { usePlaySession } from '../play-session'
import { PlayInput } from './play-input/play-input'
import { InputUnfocusedWarning } from './warnings/input-unfocused-warning'

export const CardCheckPlay: React.FC = observer(() => {
  const checkStore = useCheckStore()
  const playSession = usePlaySession()

  //!Подсветка инпута
  const [isPlayInputHighlighting, setIsPlayInputHighlighting] = useState(false)
  const [playInputHighlightColor, setPlayInputHighlightColor] = useState<string | null>(null)

  const highlightInput = (color: string): Promise<void> => {
    return new Promise((resolve) => {
      setIsPlayInputHighlighting(true)
      setPlayInputHighlightColor(color)
      setTimeout(() => {
        setPlayInputHighlightColor(null)
        resolve()
      }, 275)
    })
  }

  const highlightInputCorrect = (): Promise<void> => {
    return highlightInput('#52e545d1')
  }
  const highlightInputIncorrect = (): Promise<void> => {
    return highlightInput('#e54545d1')
  }

  //!Предупреждение, что пользователь убрал фокус с инпута
  const [isInputUnfocusedWarningShown, setIsInputUnfocusedWarningShown] = useState(
    !playSession.userInput.isInputFocused,
  )
  //Синхронизация isInputUnfocusedWarningShown с состоянием фокуса инпута
  useEffect(() => {
    if (!isPlayInputHighlighting) {
      setIsInputUnfocusedWarningShown(!playSession.userInput.isInputFocused)
    }
  }, [playSession.userInput.isInputFocused])

  const inputUnfocusedWarningTransition = useTransition(isInputUnfocusedWarningShown, {
    from: { y: 110 },
    enter: { y: 0 },
    leave: { y: 110 },
  })

  //!Обработчики
  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (e.code === 'Enter') {
      playSession.unfocusUserInput()
      setIsInputUnfocusedWarningShown(false)

      const isUserTranslateCorrect = playSession.checkUserTranslate()

      if (isUserTranslateCorrect) {
        await highlightInputCorrect()
      } else {
        await highlightInputIncorrect()
      }

      //Таймаут на время transition
      setTimeout(() => {
        setIsPlayInputHighlighting(false)
        playSession.goToNextWord()
      }, 300)
    }
  }

  const onSkipWordButtonClick = (): void => {
    //Анфокус при нажатии на кнопку пропуска слова не считается за то, что пользователь убрал фокус с инпута
    setIsInputUnfocusedWarningShown(false)
    playSession.skipCurrentWord()
  }

  return (
    <CardCheckBlockTemplate width={1100} height={550} absoluteFooterPosition={true}>
      <>
        <AbortSessionBlock>
          <AbortSessionButton onClick={checkStore.endPlaySession} title={'Вернуться к настройкам'}>
            <ArrowLeft size={35} />
          </AbortSessionButton>
        </AbortSessionBlock>

        <Title>Происходит акт проверки</Title>
      </>
      <>
        <ContentContainer>
          <PlayField>
            <InterfaceForPlay>
              <WordToBeTranslated>{playSession.shownWord}</WordToBeTranslated>
              <PlayInput
                readonly={isPlayInputHighlighting}
                inputStore={playSession.userInput}
                value={playSession.userInput.value}
                enterHandler={handleEnter}
                styles={{
                  backgroundColor: playInputHighlightColor ? playInputHighlightColor : undefined,
                  transition: isPlayInputHighlighting ? '0.3s' : undefined,
                }}
              />
              <SkipWordButton disabled={isPlayInputHighlighting} onClick={onSkipWordButtonClick}>
                Я не помню 😢
              </SkipWordButton>
            </InterfaceForPlay>
          </PlayField>
        </ContentContainer>
      </>
      {inputUnfocusedWarningTransition((style, item) => {
        return (
          item && (
            <animated.div style={style}>
              <InputUnfocusedWarning />
            </animated.div>
          )
        )
      })}
    </CardCheckBlockTemplate>
  )
})

const ContentContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const AbortSessionBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 25px;
  top: 0;
  bottom: 0;
`
const AbortSessionButton = styled.button`
  border-radius: 6px;
  padding: 6px;
  background-color: transparent;
  transition: 0.2s;

  &:hover {
    background-color: #dcdcdcc5;
  }
`
const Title = styled.div``
const PlayField = styled.div``
const InterfaceForPlay = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const WordToBeTranslated = styled.div`
  position: absolute;
  width: 100%;
  top: -100px;
  margin: 0 auto;
  margin: auto;
  font-size: 48px;
  margin-bottom: 30px;
  text-align: center;
`
const SkipWordButton = styled(Button)`
  position: absolute;
  bottom: -90px;
  font-size: 28px;
  margin-top: 20px;
  color: #2e87ec;
  background-color: #fafbfc;
  border: none;
  border-radius: 0;
  transition: 0.25s;

  &:hover {
    color: #ffffff;
    background-color: #2e87ec;
  }
`
