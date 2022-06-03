import React, { createContext, useContext, useState } from 'react'

import { observer } from 'mobx-react-lite'

import { CenteredPageContent } from 'components/utility/styled'

import { Card } from 'api/api'

import { CardCheckStore } from 'stores/card-check-store/check-store'
import { useStore } from 'stores/root-store/context'

import { CardCheckPlaySession } from './play-session/play-session'
import { CardCheckSettings } from './settings/settings'

export interface CardCheckPagesProps {
  checkStore: CardCheckStore
}

interface Props {
  card: Card
}

const CheckStoreContext = createContext<CardCheckStore>({} as CardCheckStore)
export const useCheckStore = (): CardCheckStore => useContext(CheckStoreContext)

export const CheckPageOriginalContent: React.FC<Props> = observer(({ card }) => {
  const { createCardCheckStore } = useStore()

  const [checkStore] = useState(() => createCardCheckStore(card))

  return (
    <CenteredPageContent>
      {card && (
        <CheckStoreContext.Provider value={checkStore}>
          {checkStore.checkState === 'settings' && <CardCheckSettings checkStore={checkStore} />}
          {checkStore.checkState === 'session' && checkStore.playSession && (
            <CardCheckPlaySession playSession={checkStore.playSession} />
          )}
        </CheckStoreContext.Provider>
      )}
    </CenteredPageContent>
  )
})
