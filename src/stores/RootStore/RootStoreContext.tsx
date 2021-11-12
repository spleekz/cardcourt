import React, { createContext, FC, useContext } from 'react'
import { IRootStore, RootStore } from './RootStore'

interface RootStoreProviderProps {
  children: React.ReactNode
}

const RootStoreContext = createContext<IRootStore>(new RootStore())

export const RootStoreProvider: FC<RootStoreProviderProps> = ({ children }): JSX.Element => {
  const rootStore = new RootStore()
  return <RootStoreContext.Provider value={rootStore}>{children}</RootStoreContext.Provider>
}

export const useStore = (): IRootStore => useContext(RootStoreContext)
