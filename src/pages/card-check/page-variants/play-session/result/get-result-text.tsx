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
  [P in ResultStatus]: string
}

export const getResultText = ({
  resultStatus,
  totalWordsCount,
  correctWordsCount,
}: Config): string | JSX.Element => {
  const resultStatusColors: ResultStatusColors = {
    fail: '#ff0000',
    bad: '#ff3333',
    normal: '#ccc900',
    good: '#7fb33b',
    excellent: '#33b633',
    win: '#1caf1c',
  }

  const correctWordsCountColor = resultStatusColors[resultStatus]

  const ColoredCorrectWordsCount: React.FC = () => {
    return (
      <CorrectWordsCount color={correctWordsCountColor}>
        {correctWordsCount}/{totalWordsCount}
      </CorrectWordsCount>
    )
  }

  let resultText: string | JSX.Element

  const allCorrectWordsResultText = (
    <ResultText>
      <ColoredCorrectWordsCount /> — Все слова переведены верно
    </ResultText>
  )
  const noCorrectWordsResultText = (
    <ResultText>
      <ColoredCorrectWordsCount /> — Вы перевели все слова неправильно
    </ResultText>
  )

  if (correctWordsCount === totalWordsCount) {
    resultText = allCorrectWordsResultText
  } else if (correctWordsCount === 0) {
    resultText = noCorrectWordsResultText
  } else {
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
        Вы правильно перевели <ColoredCorrectWordsCount /> {wordsCountForm}
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
const CorrectWordsCount = styled.span<{ color: string }>`
  font-size: 29px;
  font-weight: bold;
  color: ${(props) => props.color};
`
