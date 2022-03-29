import { useEffect, useLayoutEffect } from 'react'
import { Card } from '../api/api'
import { useStore } from '../stores/root-store/context'

export const useCard = (cardId: string | undefined): Card | null | undefined => {
  const { cardsStore } = useStore()

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
