import React from 'react'

import { App } from 'app'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { RootStoreProvider } from 'stores/root-store/context'

ReactDOM.render(
  <BrowserRouter>
    <RootStoreProvider>
      <App />
    </RootStoreProvider>
  </BrowserRouter>,
  document.getElementById('root'),
)
