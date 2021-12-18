import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ICard } from '../../stores/cards-store'
import { CardList } from './card-list'

interface ICardListProps {
  cardList: Array<ICard>
}

const CardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 0;
  left: 0;
`
const CreateCardButton = styled.button`
  position: absolute;
  top: -30px;
  margin: 0px 0px 16px 8px;
`

export const CardCourt: React.FC<ICardListProps> = ({ cardList }) => {
  return (
    <CardListContainer>
      <Link to='/card/new'>
        <CreateCardButton>Создать</CreateCardButton>
      </Link>
      <CardList cards={cardList} />
    </CardListContainer>
  )
}
