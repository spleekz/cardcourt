import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { ICard } from '../../stores/cards-store'
import { Card } from '../../components/cards/card'

interface ICardListProps {
  cards: Array<ICard>
}

const CardListContainer = styled.div`
  display: flex;
`

export const CardList: React.FC<ICardListProps> = observer(({ cards }) => {
  return (
    <CardListContainer>
      {cards.map((card) => {
        return <Card type='element' card={card} key={card.id} />
      })}
    </CardListContainer>
  )
})
