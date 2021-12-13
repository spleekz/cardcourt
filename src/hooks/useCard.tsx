import { useEffect } from 'react'
import { ICard } from '../stores/CardsStore'
import { useStore } from '../stores/RootStore/RootStoreContext'

export const useCard = (cardId: string | undefined): ICard | null | undefined => {
  const { CardsStore } = useStore()

  useEffect(() => {
    if (cardId) {
      CardsStore.currentCardId.set(cardId)
    }
  }, [cardId])

  return CardsStore.currentCard
}
