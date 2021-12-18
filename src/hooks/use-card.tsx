import { useEffect } from 'react'
import { ICard } from '../stores/cards-store'
import { useStore } from '../stores/root-store/context'

export const useCard = (cardId: string | undefined): ICard | null | undefined => {
  const { cardsStore } = useStore()

  useEffect(() => {
    if (cardId) {
      cardsStore.currentCardId.set(cardId)
    }
  }, [cardId])

  useEffect(() => {
    return () => cardsStore.currentCardId.set(null)
  }, [])

  return cardsStore.currentCard
}
