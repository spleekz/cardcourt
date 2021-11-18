import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router'
import { ICard } from '../../stores/CardsStore'
import { useStore } from '../../stores/RootStore/RootStoreContext'
import { observer } from 'mobx-react-lite'

interface ICardProps {
  card: ICard | null
}

const CardPageContainer = styled.div``

export const Card: React.FC<ICardProps> = observer(({ card }): JSX.Element => {
  const { CardsStore } = useStore()
  const { cardId } = useParams()

  useEffect(() => {
    if (cardId) {
      CardsStore.currentCardId.set(cardId)
    }
  }, [cardId])

  return <>{card && <CardPageContainer>{card.name}</CardPageContainer>}</>
})
