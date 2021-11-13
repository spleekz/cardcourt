import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Header } from './components/Header'
import { CardsPage } from './pages/Cards/CardsPage'

const GlobalStyles = createGlobalStyle`
  * {
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  body {
    background-color:#89a4ff;
  }
`
const AppContainer = styled.div``

export const App: FC = observer((): JSX.Element => {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <CardsPage />
      </AppContainer>
    </>
  )
})
