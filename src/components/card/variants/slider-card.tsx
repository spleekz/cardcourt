import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { CardWords } from '../../../api/api'
import { CardAuthorDiv, CardNameDiv } from '../styled-components'
import { CardTemplate } from '../template'
import { CardVariantComponent } from './types'

const SliderCardBody: React.FC<{ words: CardWords }> = ({ words }) => {
  return (
    <>
      {words.map((word) => {
        return (
          <WordPaitContainer key={word._id}>
            {word.en}-{word.ru}
          </WordPaitContainer>
        )
      })}
    </>
  )
}
const WordPaitContainer = styled.div`
  text-align: center;
  font-size: 28px;
`

export const SliderCard: CardVariantComponent = ({ card, width, height }) => {
  return (
    <CardTemplate
      width={width}
      height={height}
      headColor={card.ui.headColor}
      bodyColor={card.ui.bodyColor}
    >
      <CardHeading>
        <Link to={`/card/${card._id}`}>
          <CardName>{card.name}</CardName>
        </Link>
        <CardAuthor>{card.author.name}</CardAuthor>
      </CardHeading>
      <SliderCardBody words={card.words} />
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
