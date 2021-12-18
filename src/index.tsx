import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './app'
import { RootStoreProvider } from './stores/root-store/context'

ReactDOM.render(
  <BrowserRouter>
    <RootStoreProvider>
      <App />
    </RootStoreProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
