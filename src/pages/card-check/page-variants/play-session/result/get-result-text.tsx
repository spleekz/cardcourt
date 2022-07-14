import React from 'react'

import styled from 'styled-components'

import { pluralize } from 'utils/strings'

import { ResultStatus } from './get-result-status'

type Config = {
  resultStatus: ResultStatus
  correctWordsCount: number
  totalWordsCount: number
}

type ResultStatusColors = {
  [P in Exclude<ResultStatus, 'fail' | 'win'>]: string
}

export const getResultText = ({
  resultStatus,
  totalWordsCount,
  correctWordsCount,
}: Config): string | JSX.Element => {
  const resultStatusColors: ResultStatusColors = {
    bad: '#ff3333',
    normal: '#ccc900',
    good: '#7fb33b',
    excellent: '#33b633',
  }

  const allCorrectWordsResultText = (
    <ResultText color={resultStatusColors.excellent}>Вы правильно перевели все слова</ResultText>
  )
  const noCorrectWordsResultText = (
    <ResultText color={resultStatusColors.bad}>Вы перевели все слова неправильно</ResultText>
  )

  let resultText: string | JSX.Element

  if (correctWordsCount === totalWordsCount) {
    resultText = allCorrectWordsResultText
  } else if (correctWordsCount === 0) {
    resultText = noCorrectWordsResultText
  } else {
    const correctWordsCountColor =
      resultStatusColors[resultStatus as Exclude<ResultStatus, 'fail' | 'win'>]

    const wordsCountForm = pluralize(
      {
        one: 'слова',
        two: 'слов',
        many: 'слов',
      },
      totalWordsCount,
    )

    resultText = (
      <ResultText>
        Вы правильно перевели{' '}
        <ColoredCorrectWordsCount color={correctWordsCountColor}>
          {correctWordsCount}/{totalWordsCount}
        </ColoredCorrectWordsCount>{' '}
        {wordsCountForm}
      </ResultText>
    )
  }

  return resultText
}

const ResultText = styled.div<{ color?: string }>`
  font-size: 26px;
  color: ${(props) => props.color && props.color};
  text-align: center;
  margin-bottom: 15px;
`
const ColoredCorrectWordsCount = styled.span<{ color: string }>`
  font-size: 29px;
  font-weight: bold;
  color: ${(props) => props.color};
`
