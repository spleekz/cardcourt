import React, { createContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router'
import { useStore } from '../../stores/RootStore/RootStoreContext'
import { observer } from 'mobx-react-lite'
import { ICheckStore, CheckStore } from '../../stores/CheckStore'
import { PlayCheck } from './Play/PlayCheck'
import { PrepareCheck } from './Prepare/PrepareCheck'
import { ResultCheck } from './Result/ResultCheck'
import { shuffle } from 'lodash'
import { useCard } from '../../hooks/useCard'

const CheckPageContainer = styled.div``

export const CheckStoreContext = createContext<ICheckStore>(new CheckStore())

export const CheckPage: React.FC = observer(() => {
  const { CardsStore, createCheckStore } = useStore()
  const [CheckStore] = useState<ICheckStore>(createCheckStore)
  const { cardId } = useParams()

  useEffect(() => {
    if (CardsStore.currentCard) {
      const shuffledWords = shuffle(CardsStore.currentCard!.wordList)
      CheckStore.wordList.set(shuffledWords)
    }
  }, [CardsStore.currentCard])

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
            <ResultCheck />
          ))}
      </CheckPageContainer>
    </CheckStoreContext.Provider>
  )
})
