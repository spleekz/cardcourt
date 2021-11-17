import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ICard } from '../../stores/CardsStore'
import { CardList } from './CardList'

interface ICardListProps {
  cardList: Array<ICard>
}

const CardListContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const CreateCardButton = styled.button`
  margin: 0px 0px 16px 8px;
`

export const CardsSection: React.FC<ICardListProps> = ({ cardList }): JSX.Element => {
  return (
    <CardListContainer>
      <Link to='/card/new'>
        <CreateCardButton>Создать</CreateCardButton>
      </Link>
      <CardList cards={cardList} />
    </CardListContainer>
  )
}
