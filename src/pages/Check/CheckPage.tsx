import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router'
import { useStore } from '../../stores/RootStore/RootStoreContext'
import { observer } from 'mobx-react-lite'
import { ICheckStore } from '../../stores/CheckStore'
import { PlayCheck } from './PlayCheck/PlayCheck'
import { PrepareCheck } from './PrepareCheck/PrepareCheck'

const CheckPageContainer = styled.div``

export const CheckPage: React.FC = observer((): JSX.Element => {
  const { CardsStore, createCheckStore } = useStore()
  const [CheckStore] = useState<ICheckStore>(createCheckStore)
  const { cardId } = useParams()

  useEffect(() => {
    if (!CardsStore.currentCard) {
      if (cardId) {
        CardsStore.currentCardId.set(cardId)
      }
    }
  }, [cardId])

  return (
    <CheckPageContainer>
      {CardsStore.currentCard && (CheckStore.checkMode.value ? <PlayCheck /> : <PrepareCheck />)}
    </CheckPageContainer>
  )
})
