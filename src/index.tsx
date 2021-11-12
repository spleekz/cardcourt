import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { RootStoreProvider } from './stores/RootStore/RootStoreContext'

ReactDOM.render(
  <RootStoreProvider>
    <App />
  </RootStoreProvider>,
  document.getElementById('root')
)
