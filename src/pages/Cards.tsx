import React, { FC } from 'react'
import styled from 'styled-components'
import { ICard } from '../stores/CardsStore'

interface ICardsProps {
  cardList: Array<ICard>
}

const CardsPageContainer = styled.div``
const CardListContainer = styled.div`
  width: 100%;
  display: flex;
`
const CardContainer = styled.div`
  width: 320px;
  height: 500px;
  margin: 0 8px 0 8px;
  background-color: #ffffff;
`
const CardTitle = styled.div`
  font-size: 32px;
`
const CardAuthor = styled.div`
  font-size: 28px;
`
const CardWordsContainer = styled.div``
const CardWordContainer = styled.div`
  display: flex;
  font-size: 30px;
`
const CardWord = styled.span``
const Dash = styled.span``

export const Cards: FC<ICardsProps> = ({ cardList }): JSX.Element => {
  return (
    <CardsPageContainer>
      <CardListContainer>
        {cardList.map((card) => {
          return (
            <CardContainer key={card.id}>
              <CardTitle>{card.name}</CardTitle>
              <CardAuthor>{card.author}</CardAuthor>
              <CardWordsContainer>
                {card.wordList.map((word) => {
                  return (
                    <CardWordContainer key={word.id}>
                      <CardWord>{word.en}</CardWord>
                      <Dash>—</Dash>
                      <CardWord>{word.ru}</CardWord>
                    </CardWordContainer>
                  )
                })}
              </CardWordsContainer>
            </CardContainer>
          )
        })}
      </CardListContainer>
    </CardsPageContainer>
  )
}
