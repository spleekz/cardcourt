import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { Route, Routes } from 'react-router'
import styled, { createGlobalStyle } from 'styled-components'
import { Header } from './components/Header'
import { CardsPage } from './pages/Cards/CardsPage'
import { useStore } from './stores/RootStore/RootStoreContext'
import { Card } from './pages/Card/CardPage'

const GlobalStyles = createGlobalStyle`
  * {
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  body {
    background-color:#89a4ff;
  }
 html,body,body > #root {
    min-height: 100vh;
  }
  a, a:hover, a:visited, a:active {
  color: inherit;
  text-decoration: none;
 }
`
const AppContainer = styled.div``

export const App: FC = observer((): JSX.Element => {
  const { CardsStore } = useStore()

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <Routes>
          <Route path='/' element={<CardsPage />} />
          <Route path='/card/:cardId' element={<Card card={CardsStore.currentCard} />} />
        </Routes>
      </AppContainer>
    </>
  )
})
