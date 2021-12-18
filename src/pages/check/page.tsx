import React, { createContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router'
import { useStore } from '../../stores/root-store/context'
import { observer } from 'mobx-react-lite'
import { ICheckStore, CheckStore } from '../../stores/check-store'
import { PlayCheck } from './play/play-check'
import { PrepareCheck } from './prepare/prepare-check'
import { CheckResult } from './result/check-result'
import { shuffle } from 'lodash'
import { useCard } from '../../hooks/use-card'

const CheckPageContainer = styled.div``

export const CheckStoreContext = createContext<ICheckStore>(new CheckStore())

export const CheckPage: React.FC = observer(() => {
  const { cardsStore, createCheckStore } = useStore()
  const [CheckStore] = useState<ICheckStore>(createCheckStore)
  const { cardId } = useParams()

  useEffect(() => {
    if (cardsStore.currentCard) {
      const shuffledWords = shuffle(cardsStore.currentCard!.wordList)
      CheckStore.wordList.set(shuffledWords)
    }
  }, [cardsStore.currentCard])

  const card = useCard(cardId)

  return (
    <CheckStoreContext.Provider value={CheckStore}>
      <CheckPageContainer>
        {card &&
          (CheckStore.checkMode.value === 'prepare' ? (
            <PrepareCheck card={card} />
          ) : CheckStore.checkMode.value === 'play' ? (
            <PlayCheck />
          ) : (
            <CheckResult />
          ))}
      </CheckPageContainer>
    </CheckStoreContext.Provider>
  )
})
