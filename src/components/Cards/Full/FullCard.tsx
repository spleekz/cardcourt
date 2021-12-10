import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router'
import { ICard } from '../../../stores/CardsStore'
import { useStore } from '../../../stores/RootStore/RootStoreContext'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { WordList } from '../../WordList'

export interface IFullCardProps {
  card: ICard | null
}

const CardPageContainer = styled.div`
  font-size: 40px;
`
const ToCheckPageButton = styled.button`
  font-size: 30px;
`

export const FullCard: React.FC<IFullCardProps> = observer(({ card }) => {
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
          <WordList card={card} />
        </CardPageContainer>
      )}
    </>
  )
})
