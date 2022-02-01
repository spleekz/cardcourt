import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { CardRef } from '../../../components/cards/card-ref'
import { Card } from '../../../api/api'

interface ICardListProps {
  cards: Array<Card>
}

export const CardList: React.FC<ICardListProps> = observer(({ cards }) => {
  return (
    <CardListContainer>
      {cards.map((card) => {
        return <CardRef type='element' card={card} key={card._id} />
      })}
    </CardListContainer>
  )
})

const CardListContainer = styled.div`
  display: flex;
`
