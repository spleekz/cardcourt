import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CurrentCardStore } from '../stores/current-card-store'
import { useStore } from '../stores/root-store/context'

export const useCardStoreFromURL = (): CurrentCardStore => {
  const { createCurrentCardStore } = useStore()
  const { cardId } = useParams() as { cardId: string }

  const [cardStore] = useState<CurrentCardStore>(() => createCurrentCardStore(cardId))

  return cardStore
}
