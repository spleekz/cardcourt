import React, { useEffect, useRef } from 'react'

import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { CardCheckBlockTemplate } from 'pages/card-check/check-block-template'

import { Button } from 'components/buttons/button'

import { usePlaySession } from '../play-session'

export const CardCheckPlay: React.FC = observer(() => {
  const playSession = usePlaySession()

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'Enter') {
      if (playSession.userInputValue.trim() !== '') {
        playSession.checkUserTranslate()
      }
    }
  }

  const userInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    userInputRef.current?.focus()
  }, [playSession.currentWordIndex])

  return (
    <CardCheckBlockTemplate width={1100} height={550}>
      <>Происходит акт проверки</>
      <>
        <ContentContainer>
          <PlayField>
            <InterfaceForPlay>
              <UserInputBlock>
                <WordToBeTranslated>{playSession.shownWord}</WordToBeTranslated>
                <UserInput
                  ref={userInputRef}
                  value={playSession.userInputValue}
                  onChange={(e) => playSession.setUserInputValue(e.target.value)}
                  onKeyPress={handleEnter}
                />
                <SkipWordButton onClick={playSession.skipCurrentWord}>Я не помню 😢</SkipWordButton>
              </UserInputBlock>
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
const PlayField = styled.div``
const InterfaceForPlay = styled.div`
  display: flex;
  justify-content: center;
`
const UserInputBlock = styled.div`
  position: relative;
  display: flex;
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
const UserInput = styled.input`
  border: 2px solid #373737;
  font-size: 48px;
  padding: 4px;
  border-radius: 6px;
  margin-right: 20px;
`
const SkipWordButton = styled(Button)`
  font-size: 28px;
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
