import React, { useEffect, useRef, useState } from 'react'

import { animated, useTransition } from '@react-spring/web'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { useCheckStore } from 'pages/card-check/original-content'

import { Button } from 'components/buttons/button'

import { containsEnglish, containsRussian } from 'utils/strings'

import { CardCheckBlockTemplate } from '../../components/check-block-template'
import { ButtonWithArrowLeft, ColoredCardName } from '../../components/shared-components'
import { usePlaySession } from '../play-session'
import { PlayInput } from './play-input/play-input'
import { InputUnfocusedWarning } from './warnings/input-unfocused-warning'
import { WrongLangWarning } from './warnings/wrong-lang-warning'

export const CardCheckPlay: React.FC = observer(() => {
  const checkStore = useCheckStore()
  const playSession = usePlaySession()
  const { card } = checkStore

  //!Подсветка инпута
  const [isPlayInputHighlighting, setIsPlayInputHighlighting] = useState(false)
  const [playInputHighlightColor, setPlayInputHighlightColor] = useState<string | null>(null)

  const playInputHighlightingTransitionDurationS = 0.3
  const playInputHighlightingTransitionDurationMs = playInputHighlightingTransitionDurationS * 1000
  const playInputHighlightingStayDurationMs = 40

  const highlightInput = (color: string): Promise<void> => {
    return new Promise((resolve) => {
      setIsPlayInputHighlighting(true)
      setPlayInputHighlightColor(color)

      setTimeout(() => {
        setPlayInputHighlightColor(null)

        //Таймаут на время окончания transition
        setTimeout(() => {
          setIsPlayInputHighlighting(false)
          resolve()
        }, playInputHighlightingTransitionDurationMs)
      }, playInputHighlightingTransitionDurationMs + playInputHighlightingStayDurationMs)
    })
  }

  const highlightInputCorrect = (): Promise<void> => {
    return highlightInput('#52e545d1')
  }
  const highlightInputIncorrect = (): Promise<void> => {
    return highlightInput('#e54545d1')
  }

  //!Предупреждение, что пользователь убрал фокус с инпута
  const [isPlayInputUnfocusedWarningShown, setIsPlayInputUnfocusedWarningShown] = useState(
    !playSession.userInput.isInputFocused,
  )
  //Синхронизация isInputUnfocusedWarningShown с состоянием фокуса инпута
  useEffect(() => {
    //Не показывать сообщение об анфокусе при подсвечивании инпута и потере window фокуса (alt + tab)
    if (!isPlayInputHighlighting && document.hasFocus()) {
      setIsPlayInputUnfocusedWarningShown(!playSession.userInput.isInputFocused)
    }
  }, [playSession.userInput.isInputFocused])

  const playInputUnfocusedWarningTransition = useTransition(isPlayInputUnfocusedWarningShown, {
    from: { y: 110 },
    enter: { y: 0 },
    leave: { y: 110 },
  })

  //!Предупреждение, что пользователь печатает не на том языке
  const [isWrongLangWarningShown, setIsWrongLangWarningShown] = useState(false)

  const wrongLangWarningTransition = useTransition(isWrongLangWarningShown, {
    from: { y: 110 },
    enter: { y: 0 },
    leave: { y: 110 },
  })

  useEffect(() => {
    const inputValue = playSession.userInput.value

    let isWrongLang = true

    if (checkStore.settings.langForTyping === 'en') {
      isWrongLang = containsRussian(inputValue)
    } else {
      isWrongLang = containsEnglish(inputValue)
    }

    setIsWrongLangWarningShown(isWrongLang)
  }, [playSession.userInput.value])

  //!Обработчики
  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (e.code === 'Enter') {
      if (playSession.normalizedUserInputValue) {
        playSession.unfocusUserInput()
        setIsPlayInputUnfocusedWarningShown(false)

        const isUserTranslateCorrect = playSession.checkUserTranslate()

        if (isUserTranslateCorrect) {
          await highlightInputCorrect()
        } else {
          await highlightInputIncorrect()
        }

        playSession.goNext()
      }
    }
  }

  const onSkipWordButtonClick = (): void => {
    //Анфокус при нажатии на кнопку пропуска слова не считается за то, что пользователь убрал фокус с инпута
    setIsPlayInputUnfocusedWarningShown(false)
    playSession.skipCurrentWord()
  }

  const skipWordButtonRef = useRef<HTMLButtonElement | null>(null)

  return (
    <CardCheckBlockTemplate width={1100} height={550} absoluteFooterPosition={true}>
      <>
        <AbortSessionBlock>
          <ButtonWithArrowLeft onClick={checkStore.endPlaySession} title='Вернуться к настройкам' />
        </AbortSessionBlock>

        <Title>
          <ColoredCardName cardName={card.name} cardUI={card.ui} /> — Акт проверки
        </Title>
      </>
      <>
        <ContentContainer>
          <WordCounter>
            {playSession.currentWordNumber} / {playSession.wordsCount}
          </WordCounter>
          <ContentWrapper>
            <PlayField>
              <InterfaceForPlay>
                <WordToBeTranslated>{playSession.shownWord}</WordToBeTranslated>
                <PlayInput
                  readonly={isPlayInputHighlighting}
                  inputStore={playSession.userInput}
                  value={playSession.userInput.value}
                  enterHandler={handleEnter}
                  defaultInputBlurIgnoreRefs={[skipWordButtonRef]}
                  styles={{
                    backgroundColor: playInputHighlightColor ? playInputHighlightColor : undefined,
                    transition: isPlayInputHighlighting
                      ? `${playInputHighlightingTransitionDurationS}s`
                      : undefined,
                  }}
                />
                <SkipWordButton
                  ref={skipWordButtonRef}
                  disabled={isPlayInputHighlighting}
                  onClick={onSkipWordButtonClick}
                >
                  Я не помню
                </SkipWordButton>
              </InterfaceForPlay>
            </PlayField>
          </ContentWrapper>
        </ContentContainer>
      </>
      <>
        {playInputUnfocusedWarningTransition((style, item) => {
          return (
            item && (
              <animated.div
                style={{
                  ...style,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <InputUnfocusedWarning />
              </animated.div>
            )
          )
        })}
        {wrongLangWarningTransition((style, item) => {
          return (
            item && (
              <animated.div
                style={{
                  ...style,
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <WrongLangWarning />
              </animated.div>
            )
          )
        })}
      </>
    </CardCheckBlockTemplate>
  )
})

const ContentContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const ContentWrapper = styled.div`
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
const Title = styled.div``
const WordCounter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  font-size: 31px;
  font-weight: bold;
  text-align: center;
`
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
  font-size: 48px;
  text-align: center;
`
const SkipWordButton = styled(Button)`
  position: absolute;
  bottom: -90px;
  font-size: 28px;
  color: #ffffff;
  background-color: #2e87ec;
  border: none;
  border-radius: 0;
`
