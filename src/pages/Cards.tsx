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

export const Cards: FC<ICardsProps> = ({ cardList }): JSX.Element => {
  return (
    <CardsPageContainer>
      <CardListContainer>
        {cardList.map((card) => {
          return (
            <CardContainer key={card.id}>
              <CardTitle>{card.name}</CardTitle>
              <CardAuthor>{card.author}</CardAuthor>
            </CardContainer>
          )
        })}
      </CardListContainer>
    </CardsPageContainer>
  )
}
