import React, { createContext, useContext } from 'react'

import { observer } from 'mobx-react-lite'

import { CardCheckPlaySessionStore } from 'stores/card-check-store/play-session/play-session-store'

import { CardCheckPlay } from './play/play'
import { CardCheckResult } from './result/result'

interface Props {
  playSession: CardCheckPlaySessionStore
}

const PlaySessionContext = createContext<CardCheckPlaySessionStore>({} as CardCheckPlaySessionStore)
export const usePlaySession = (): CardCheckPlaySessionStore => useContext(PlaySessionContext)

export const CardCheckPlaySession: React.FC<Props> = observer(({ playSession }) => {
  return (
    <PlaySessionContext.Provider value={playSession}>
      {playSession.sessionState === 'play' && <CardCheckPlay />}
      {playSession.sessionState === 'result' && <CardCheckResult />}
    </PlaySessionContext.Provider>
  )
})
