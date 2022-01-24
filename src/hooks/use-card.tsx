import { useEffect } from 'react'
import { Card } from '../api/api'
import { useStore } from '../stores/root-store/context'

export const useCard = (cardId: string | undefined): Card | null | undefined => {
  const { cardsStore } = useStore()

  useEffect(() => {
    if (cardId) {
      cardsStore.cardId.set(cardId)
    }
  }, [cardId])

  useEffect(() => {
    return () => cardsStore.cardId.set(null)
  }, [])

  return cardsStore.card
}
