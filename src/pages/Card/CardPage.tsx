import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router'
import { ICard } from '../../stores/CardsStore'
import { useStore } from '../../stores/RootStore/RootStoreContext'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'

interface ICardProps {
  card: ICard | null
}

const CardPageContainer = styled.div``
const ToCheckPageButton = styled.div``

export const Card: React.FC<ICardProps> = observer(({ card }): JSX.Element => {
  const { CardsStore } = useStore()
  const { cardId } = useParams()

  useEffect(() => {
    if (!card) {
      if (cardId) {
        CardsStore.currentCardId.set(cardId)
      }
    }
  }, [cardId])

  return (
    <>
      {card && (
        <CardPageContainer>
          {card.name}
          <Link to={`check`}>
            <ToCheckPageButton>Начать проверку</ToCheckPageButton>
          </Link>
        </CardPageContainer>
      )}
    </>
  )
})
