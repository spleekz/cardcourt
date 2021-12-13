import { observer } from 'mobx-react-lite'
import React from 'react'
import { Route, Routes } from 'react-router'
import styled, { createGlobalStyle } from 'styled-components'
import { Header } from './components/Header'
import { CardCourtPage } from './pages/CardCourt/CardCourtPage'
import { NewCardPage } from './pages/NewCard/NewCardPage'
import { CheckPage } from './pages/Check/CheckPage'
import { Card } from './components/Cards/Card'

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
 button {
   cursor:pointer;
 }
 input,button {
   outline: none;
   border:0;
 }

`
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0px 16px 6px 16px;
`

export const App: React.FC = observer(() => {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <Routes>
          <Route path='/' element={<CardCourtPage />} />
          <Route path='card/new' element={<NewCardPage />} />
          <Route path='/card/:cardId' element={<Card type='full' />} />
          <Route path='card/:cardId/check' element={<CheckPage />} />
          <Route path='card/:cardId/edit' element={<Card type='edit' />} />
        </Routes>
      </AppContainer>
    </>
  )
})
