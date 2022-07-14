import React from 'react'

import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import {
  ResultWord,
  isNotSkippedResultWord,
} from 'stores/card-check-store/play-session/play-session-store'

type Props = {
  word: ResultWord
}

export const ResultIncorrectWord: React.FC<Props> = observer(({ word }) => {
  return (
    <Container>
      <WordToBeTranslated>{word.wordToBeTranslated}</WordToBeTranslated>
      <Dash> — </Dash>
      <CorrectTranslate>{word.correctTranslate}</CorrectTranslate>
      <ExtraInfo>
        (
        {isNotSkippedResultWord(word) ? (
          <UserTranslate>
            Ваш перевод : <WrongTranslate>{word.userTranslate}</WrongTranslate>
          </UserTranslate>
        ) : (
          <UserSkipWord>Вы пропустили это слово</UserSkipWord>
        )}
        )
      </ExtraInfo>
    </Container>
  )
})

const Container = styled.div`
  margin-bottom: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`
const Dash = styled.span`
  font-size: 32px;
  font-weight: bold;
`
const Word = styled.span`
  font-size: 32px;
  font-weight: bold;
`
const WordToBeTranslated = styled(Word)``
const CorrectTranslate = styled(Word)``
const ExtraInfo = styled.span`
  font-size: 17px;
  margin-left: 6px;
  color: #606060;
  font-weight: bold;
`
const ExtraInfoBlock = styled.span`
  padding: 1.5px;
  border-radius: 3px;
`
const UserTranslate = styled.span``
const WrongTranslate = styled(ExtraInfoBlock)`
  color: #da0000;
`
const UserSkipWord = styled(ExtraInfoBlock)`
  background-color: #da0000;
  color: #ffffff;
`
