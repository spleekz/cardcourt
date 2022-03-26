import React, { createContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router'
import { useStore } from '../../stores/root-store/context'
import { observer } from 'mobx-react-lite'
import { CheckStore } from '../../stores/check-store'
import { PlayCheck } from './play/play-check'
import { PrepareCheck } from './prepare/prepare-check'
import { CheckResult } from './result/check-result'
import { shuffle } from 'lodash'
import { useCard } from '../../hooks/use-card'
import { registerPage } from '../../hocs/register-page'

export const CheckStoreContext = createContext<CheckStore>(new CheckStore())

export const CheckPage: React.FC = registerPage(
  observer(() => {
    const { createCheckStore } = useStore()
    const [CheckStore] = useState<CheckStore>(createCheckStore)

    const { cardId } = useParams()

    const card = useCard(cardId)

    useEffect(() => {
      if (card) {
        const shuffledWords = shuffle(card.words)
        CheckStore.setWordList(shuffledWords)
      }
    }, [card])

    return (
      <CheckStoreContext.Provider value={CheckStore}>
        <CheckPageContainer>
          {card &&
            (CheckStore.checkMode === 'prepare' ? (
              <PrepareCheck card={card} />
            ) : CheckStore.checkMode === 'play' ? (
              <PlayCheck />
            ) : (
              <CheckResult />
            ))}
        </CheckPageContainer>
      </CheckStoreContext.Provider>
    )
  })
)

const CheckPageContainer = styled.div``
