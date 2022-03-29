import { useEffect, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from '../api/api'
import { useStore } from '../stores/root-store/context'

export const useCardFromURL = (): Card | null => {
  const { cardsStore } = useStore()
  const { cardId } = useParams()

  useEffect(() => {
    if (cardId) {
      cardsStore.setCardId(cardId)
    }
  }, [cardId])

  // Используем useLayoutEffect, т.к. с useEffect сначала отрисуется другая страница,
  // а потом сбросится id карточки. Это может привести к визуальным багам
  useLayoutEffect(() => {
    return () => cardsStore.setCardId(null)
  }, [])

  return cardsStore.card
}
