import React from 'react'

import { ColoredCardName } from 'pages/card-check/shared-components'

import { Card } from 'api/api'

import { pluralize } from 'utils/strings'

type Config = {
  card: Card
  wordsCount: number
  correctWordsCount: number
}

export const getResultTitle = ({ card, wordsCount, correctWordsCount }: Config): JSX.Element => {
  const allCorrectWordsResultText: JSX.Element = (
    <>
      Вы правильно перевели все слова из карточки <ColoredCardName card={card} /> 🎉
    </>
  )
  const noCorrectWordResultText: JSX.Element = (
    <>
      Вы перевели все слова карточки <ColoredCardName card={card} /> неправильно 😭
    </>
  )

  const wordForm = pluralize(
    {
      one: 'слова',
      two: 'слов',
      many: 'слов',
    },
    wordsCount,
  )
  const defaultResultText: JSX.Element = (
    <>
      Вы правильно перевели {correctWordsCount}/{wordsCount} {wordForm} из карточки{' '}
      <ColoredCardName card={card} />
    </>
  )

  let resultTitleText: JSX.Element
  if (correctWordsCount === 0) {
    resultTitleText = noCorrectWordResultText
  } else if (correctWordsCount === wordsCount) {
    resultTitleText = allCorrectWordsResultText
  } else {
    resultTitleText = defaultResultText
  }

  return resultTitleText
}
