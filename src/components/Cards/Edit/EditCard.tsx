import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useStore } from '../../../stores/RootStore/RootStoreContext'

const EdicCardContainer = styled.div``

export const EditCard: React.FC = observer(() => {
  const { CardsStore } = useStore()
  const { cardId } = useParams()

  const card = CardsStore.currentCard

  useEffect(() => {
    if (cardId) {
      CardsStore.currentCardId.set(cardId)
    }
  }, [cardId])

  return card && <EdicCardContainer>card {card.id} edit</EdicCardContainer>
})
