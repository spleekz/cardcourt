import React from 'react'

import { observer } from 'mobx-react-lite'
import { ArrowLeft } from 'react-bootstrap-icons'
import styled from 'styled-components'

import { CardCheckBlockTemplate } from 'pages/card-check/components/check-block-template'
import { PlayInput } from 'pages/card-check/components/play-input-variants/play-input'
import { useCheckStore } from 'pages/card-check/original-content'

import { Button } from 'components/buttons/button'

import { usePlaySession } from '../play-session'

export const CardCheckPlay: React.FC = observer(() => {
  const checkStore = useCheckStore()
  const playSession = usePlaySession()

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'Enter') {
      playSession.checkUserTranslate()
    }
  }

  return (
    <CardCheckBlockTemplate width={1100} height={550}>
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
                inputStore={playSession.userInput}
                value={playSession.userInput.value}
                onKeyPress={handleEnter}
              />
              <SkipWordButton onClick={playSession.skipCurrentWord}>Я не помню 😢</SkipWordButton>
            </InterfaceForPlay>
          </PlayField>
        </ContentContainer>
      </>
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
