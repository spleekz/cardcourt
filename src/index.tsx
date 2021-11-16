import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { RootStoreProvider } from './stores/RootStore/RootStoreContext'

ReactDOM.render(
  <BrowserRouter>
    <RootStoreProvider>
      <App />
    </RootStoreProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
