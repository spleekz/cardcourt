import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { CardList } from './card-list'
import { useStore } from '../../../stores/root-store/context'

export const Court: React.FC = observer(() => {
  const { cardsStore } = useStore()

  return (
    <CardListContainer>
      <Link to='/card/new'>
        <CreateCardButton>Создать</CreateCardButton>
      </Link>
      <CardList cards={cardsStore.cards} />
    </CardListContainer>
  )
})

const CardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`
const CreateCardButton = styled.button`
  position: absolute;
  top: -30px;
  margin: 0px 0px 16px 8px;
`
