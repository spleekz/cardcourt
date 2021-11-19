import { observer } from 'mobx-react-lite'
import React from 'react'
import { Route, Routes } from 'react-router'
import styled, { createGlobalStyle } from 'styled-components'
import { Header } from './components/Header'
import { CardsPage } from './pages/Cards/CardsPage'
import { useStore } from './stores/RootStore/RootStoreContext'
import { Card } from './pages/Card/CardPage'
import { NewCardPage } from './pages/NewCard/NewCardPage'
import { CheckPage } from './pages/Check/CheckPage'

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
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0px 16px 6px 16px;
`

export const App: React.FC = observer((): JSX.Element => {
  const { CardsStore } = useStore()

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <Routes>
          <Route path='/' element={<CardsPage />} />
          <Route path='/card/:cardId' element={<Card card={CardsStore.currentCard} />} />
          <Route path='card/:cardId/check' element={<CheckPage />} />
          <Route path='card/new' element={<NewCardPage />} />
        </Routes>
      </AppContainer>
    </>
  )
})
