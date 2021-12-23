import { observer } from 'mobx-react-lite'
import React, { createContext, useContext, useState } from 'react'
import { Route, Routes } from 'react-router'
import styled, { createGlobalStyle } from 'styled-components'
import { Header } from './components/header'
import { CardCourtPage } from './pages/card-court/page'
import { NewCardPage } from './pages/new-card/page'
import { CheckPage } from './pages/check/page'
import { EditCardPage } from './pages/edit-card/page'
import { CardDonePopup } from './components/popups/card-done'
import { useStore } from './stores/root-store/context'
import { CardPage } from './pages/card/page'

interface Popup {
  value: boolean
  set: React.Dispatch<React.SetStateAction<boolean>>
}

interface Popups {
  cardDone: Popup
}

export const PopupsContext = createContext<Popups>({} as Popups)
export const usePopupContext = (): Popups => useContext(PopupsContext)

export const App: React.FC = observer(() => {
  const { appStore } = useStore()

  const [isCardDonePopup, setIsCardDonePopup] = useState<boolean>(false)
  const isAnyPopupOpened = isCardDonePopup

  const PopupsForContext: Popups = {
    cardDone: {
      value: isCardDonePopup,
      set: setIsCardDonePopup,
    },
  }

  return (
    <PopupsContext.Provider value={PopupsForContext}>
      <GlobalStyles isPopup={isAnyPopupOpened} />
      <AppContainer>
        <CardDonePopup
          isOpened={isCardDonePopup}
          title={appStore.page.value === 'new' ? 'Карточка создана!' : 'Карточка обновлена!'}
        />
        <Header />
        <Routes>
          <Route path='/' element={<CardCourtPage />} />
          <Route path='card/new' element={<NewCardPage />} />
          <Route path='/card/:cardId' element={<CardPage />} />
          <Route path='card/:cardId/check' element={<CheckPage />} />
          <Route path='card/:cardId/edit' element={<EditCardPage />} />
        </Routes>
      </AppContainer>
    </PopupsContext.Provider>
  )
})

const GlobalStyles = createGlobalStyle<{ isPopup: boolean }>`
  * {
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  body {
    font-family: 'Open Sans', sans-serif;
    background-color:#89a4ff;
    overflow: ${(props) => props.isPopup && 'hidden'};
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
  padding: 0 30px 0 30px;
`
