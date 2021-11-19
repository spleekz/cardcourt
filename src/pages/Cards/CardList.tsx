import React from 'react'
import styled from 'styled-components'
import { ICard } from '../../stores/CardsStore'
import { CardElement } from './CardElement'

interface ICardListProps {
  cards: Array<ICard>
}

const CardListContainer = styled.div`
  display: flex;
`

export const CardList: React.FC<ICardListProps> = ({ cards }) => {
  return (
    <CardListContainer>
      {cards.map((card) => {
        return <CardElement card={card} key={card.id} />
      })}
    </CardListContainer>
  )
}
