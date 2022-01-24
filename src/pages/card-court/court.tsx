import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { CardList } from './card-list'
import { Card } from '../../api/api'

interface ICardListProps {
  cardList: Array<Card>
}

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
