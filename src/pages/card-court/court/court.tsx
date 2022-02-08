import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { CardSlider } from './card-slider'
import { useStore } from '../../../stores/root-store/context'

export const Court: React.FC = observer(() => {
  const { cardsStore } = useStore()

  useEffect(() => {
    cardsStore.loadCards({ pagesToLoad: 2 })
  }, [cardsStore.search])

  return (
    <CardListContainer>
      <Link to='/card/new'>
        <CreateCardButton>Создать</CreateCardButton>
      </Link>
      <CardSlider cards={cardsStore.cards} />
    </CardListContainer>
  )
})

const CardListContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`
const CreateCardButton = styled.button`
  position: absolute;
  top: -30px;
  margin: 0px 0px 16px 8px;
`
