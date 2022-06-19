import React from 'react'

import styled from 'styled-components'

import { usePlaySession } from '../../../play-session'
import { ResultIncorrectWord } from './incorrect-word'

export const ResultIncorrectWords: React.FC = () => {
  const playSession = usePlaySession()

  return (
    <Container>
      <Title>Вы ошиблись в словах:</Title>
      <IncorrectWords>
        {playSession.incorrectWords.map((word) => {
          return <ResultIncorrectWord key={word._id} word={word} />
        })}
      </IncorrectWords>
    </Container>
  )
}

const Container = styled.div``
const Title = styled.div`
  margin-bottom: 9px;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
`
const IncorrectWords = styled.div``
