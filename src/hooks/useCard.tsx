import { useEffect } from 'react'
import { ICard } from '../stores/CardsStore'
import { useStore } from '../stores/RootStore/RootStoreContext'

export const useCard = (cardId: string | undefined): ICard | null | undefined => {
  const { cardsStore } = useStore()

  useEffect(() => {
    if (cardId) {
      cardsStore.currentCardId.set(cardId)
    }
  }, [cardId])

  return cardsStore.currentCard
}
