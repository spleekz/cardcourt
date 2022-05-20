import React from 'react'

import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { CardWordPairBlock } from '../card-shared-components/body'
import { CardAuthorDiv, CardNameDiv } from '../card-shared-components/heading'
import { CardTemplate } from '../template'
import { CardVariantComponent } from './types'

export const SliderCard: CardVariantComponent = ({ card, width, height }) => {
  const wordPairs = card.words.map((word) => {
    return (
      <WordPairContainer key={word._id}>
        {word.en}-{word.ru}
      </WordPairContainer>
    )
  })

  return (
    <CardTemplate
      width={width}
      height={height}
      bodyColor={card.ui.bodyColor}
      wordsColor={card.ui.wordsColor}
    >
      <CardHeading>
        <Link to={`/card/${card._id}`}>
          <CardName>{card.name}</CardName>
        </Link>
        <CardAuthor>{card.author.name}</CardAuthor>
      </CardHeading>

      <CardWordsContainer>{wordPairs}</CardWordsContainer>
    </CardTemplate>
  )
}

const CardHeading = styled.div`
  padding: 5px 15px 10px 15px;
`
const CardName = styled(CardNameDiv)`
  font-size: 38px;
  transition: 0.17s;

  &:hover {
    color: #b6ffce;
  }
`
const CardAuthor = styled(CardAuthorDiv)`
  font-size: 21px;
  margin-top: -4px;
`
const CardWordsContainer = styled.div``
const WordPairContainer = styled(CardWordPairBlock)`
  text-align: center;
  font-size: 28px;
`
