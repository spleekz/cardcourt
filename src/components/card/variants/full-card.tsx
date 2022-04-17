import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { CardWords } from '../../../api/api'
import { CardAuthorDiv, CardFooterButton, CardNameDiv } from '../styled-components'
import { CardTemplate } from '../template'
import { CardVariantComponent } from './types'

const FullCardBody: React.FC<{ words: CardWords }> = ({ words }) => {
  return (
    <>
      {words.map((word) => {
        return (
          <WordPairContainer key={word._id}>
            <WordContainer textAlign='right'>{word.en}</WordContainer>
            <Dash>—</Dash>
            <WordContainer textAlign='left'>{word.ru}</WordContainer>
          </WordPairContainer>
        )
      })}
    </>
  )
}

const WordPairContainer = styled.div`
  display: flex;
`
const WordContainer = styled.div<{ textAlign: string }>`
  font-size: 24px;
  width: 44%;
  text-align: ${(props) => props.textAlign};
`
const Dash = styled.span`
  font-size: 26px;
  margin: 0 8px;
  align-self: center;
`

export const FullCard: CardVariantComponent = ({ card, width, height }) => {
  return (
    <CardTemplate
      width={width}
      height={height}
      headColor={card.ui.headColor}
      bodyColor={card.ui.bodyColor}
    >
      <CardHeading>
        <CardName>{card.name}</CardName>
        <CardAuthor>{card.author.name}</CardAuthor>
      </CardHeading>
      <FullCardBody words={card.words} />
      <Link to={`/card/${card._id}/check`}>
        <GoToCardCheck>Проверить</GoToCardCheck>
      </Link>
    </CardTemplate>
  )
}

const CardHeading = styled.div`
  padding: 10px 15px;
`
const CardName = styled(CardNameDiv)`
  font-size: 32px;
`
const CardAuthor = styled(CardAuthorDiv)`
  font-size: 22px;
`
const GoToCardCheck = styled(CardFooterButton)``
