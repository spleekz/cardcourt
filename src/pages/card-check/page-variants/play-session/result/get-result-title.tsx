import React from 'react'

import styled from 'styled-components'

import { ColoredCardName } from 'pages/card-check/components/shared-components'

import { Card } from 'api/api'

import { pluralize } from 'utils/strings'

type Config = {
  card: Card
  wordsCount: number
  correctWordsCount: number
}

type CorrectWordsCountColors = {
  bad: string
  normal: string
  good: string
  excellent: string
}

export const getResultTitle = ({ card, wordsCount, correctWordsCount }: Config): JSX.Element => {
  const correctWordsPercent = (correctWordsCount / wordsCount) * 100

  const ColoredNameOfCard = <ColoredCardName cardName={card.name} cardUI={card.ui} />

  const allCorrectWordsResultText: JSX.Element = (
    <>Вы правильно перевели все слова из карточки {ColoredNameOfCard} 🎉</>
  )
  const noCorrectWordResultText: JSX.Element = (
    <>Вы перевели все слова карточки {ColoredNameOfCard} неправильно 😭</>
  )

  const correctWordsCountColors: CorrectWordsCountColors = {
    bad: '#ff3333',
    normal: '#eae70b',
    good: '#7fb33b',
    excellent: '#33b633',
  }

  const { bad, normal, good, excellent } = correctWordsCountColors
  const correctWordsCountColor =
    correctWordsPercent <= 30
      ? bad
      : correctWordsPercent <= 50
      ? normal
      : correctWordsPercent <= 70
      ? good
      : excellent

  const wordsCountForm = pluralize(
    {
      one: 'слова',
      two: 'слов',
      many: 'слов',
    },
    wordsCount,
  )
  const defaultResultText: JSX.Element = (
    <>
      Вы правильно перевели{' '}
      <WordsResult color={correctWordsCountColor}>
        {correctWordsCount}/{wordsCount}
      </WordsResult>{' '}
      {wordsCountForm} из карточки {ColoredNameOfCard}
    </>
  )

  let resultTitleText: JSX.Element
  if (correctWordsPercent === 0) {
    resultTitleText = noCorrectWordResultText
  } else if (correctWordsPercent === 100) {
    resultTitleText = allCorrectWordsResultText
  } else {
    resultTitleText = defaultResultText
  }

  return resultTitleText
}

const WordsResult = styled.span<{ color: string }>`
  color: ${(props) => props.color};
`
