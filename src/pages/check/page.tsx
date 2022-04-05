import React, { createContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useStore } from '../../stores/root-store/context'
import { observer } from 'mobx-react-lite'
import { CheckStore } from '../../stores/check-store'
import { PlayCheck } from './play/play-check'
import { PrepareCheck } from './prepare/prepare-check'
import { CheckResult } from './result/check-result'
import { shuffle } from 'lodash'
import { useCardFromURL } from '../../hooks/use-card-from-url'
import { registerPage } from '../../hocs/register-page'

export const CheckStoreContext = createContext<CheckStore>(new CheckStore())

export const CheckPage: React.FC = registerPage(
  observer(() => {
    const { createCheckStore } = useStore()
    const [CheckStore] = useState<CheckStore>(createCheckStore)

    const card = useCardFromURL()

    useEffect(() => {
      if (card) {
        const shuffledWords = shuffle(card.words)
        CheckStore.setWordList(shuffledWords)
      }
    }, [card])

    return (
      <CheckStoreContext.Provider value={CheckStore}>

        <Container>

          {card &&
            (CheckStore.checkMode === 'prepare' ? (
              <PrepareCheck card={card} />
            ) : CheckStore.checkMode === 'play' ? (
              <PlayCheck />
            ) : (
              <CheckResult />
            ))}

        </Container>

      </CheckStoreContext.Provider>
    )
  })
)

const Container = styled.div``
