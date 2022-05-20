import { useState } from 'react'

import { useParams } from 'react-router-dom'

import { Card } from 'api/api'

import { CurrentCardStore } from 'stores/current-card-store'
import { useStore } from 'stores/root-store/context'

interface UseCardStoreFromURLReturnValue {
  cardStore: CurrentCardStore
  card: Card | null
}

export const useCardStoreFromURL = (): UseCardStoreFromURLReturnValue => {
  const { createCurrentCardStore } = useStore()
  const { cardId } = useParams() as { cardId: string }

  const [cardStore] = useState<CurrentCardStore>(() => createCurrentCardStore(cardId))

  return {
    cardStore,
    card: cardStore.card,
  }
}
