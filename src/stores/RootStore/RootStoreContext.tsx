import React, { createContext, useContext } from 'react'
import { IRootStore, RootStore } from './RootStore'

interface RootStoreProviderProps {
  children: React.ReactNode
}

const RootStoreContext = createContext<IRootStore>(new RootStore())

export const RootStoreProvider: React.FC<RootStoreProviderProps> = ({ children }) => {
  const rootStore = new RootStore()
  return <RootStoreContext.Provider value={rootStore}>{children}</RootStoreContext.Provider>
}

export const useStore = (): IRootStore => useContext(RootStoreContext)
