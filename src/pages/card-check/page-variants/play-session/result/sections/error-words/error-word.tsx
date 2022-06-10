import React from 'react'

import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { CardWord } from 'api/api'

import { Lang } from 'stores/stores-utility-types'

import { reverseLang } from 'utils/basic'

type Props = {
  word: CardWord
  langForShowing: Lang
}

export const ErrorWord: React.FC<Props> = observer(({ word, langForShowing }) => {
  return (
    <Container>
      <WordToBeTranslated>{word[langForShowing]}</WordToBeTranslated>
      <Dash> — </Dash>
      <RightTranslate>{word[reverseLang(langForShowing)]}</RightTranslate>
    </Container>
  )
})

const Container = styled.div``
const Dash = styled.span`
  font-size: 32px;
  font-weight: bold;
`
const Word = styled.span`
  font-size: 32px;
  font-weight: bold;
`
const WordToBeTranslated = styled(Word)``
const RightTranslate = styled(Word)``
