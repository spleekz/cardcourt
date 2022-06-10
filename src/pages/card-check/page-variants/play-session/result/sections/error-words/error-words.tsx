import React from 'react'

import styled from 'styled-components'

import { useCheckStore } from 'pages/card-check/original-content'

import { usePlaySession } from '../../../play-session'
import { ErrorWord } from './error-word'

export const ResultErrorWords: React.FC = () => {
  const { settings } = useCheckStore()
  const playSession = usePlaySession()

  return (
    <ErrorWordsContainer>
      <ErrorWordsTitle>Вы ошиблись в словах:</ErrorWordsTitle>
      <ErrorWords>
        {playSession.errorWords.map((word) => {
          return <ErrorWord key={word._id} word={word} langForShowing={settings.langForShowing} />
        })}
      </ErrorWords>
    </ErrorWordsContainer>
  )
}

const ErrorWordsContainer = styled.div``
const ErrorWordsTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
`
const ErrorWords = styled.div``
