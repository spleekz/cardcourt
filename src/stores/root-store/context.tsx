import React, { createContext, useContext } from 'react'
import { RootStore } from './store'

interface RootStoreProviderProps {
  children: React.ReactNode
}

const RootStoreContext = createContext<RootStore>(new RootStore())

export const RootStoreProvider: React.FC<RootStoreProviderProps> = ({ children }) => {
  const rootStore = new RootStore()
  return <RootStoreContext.Provider value={rootStore}>{children}</RootStoreContext.Provider>
}

export const useStore = (): RootStore => useContext(RootStoreContext)
