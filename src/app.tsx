import { observer } from 'mobx-react-lite'
import React, { createContext, useContext, useLayoutEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import styled, { createGlobalStyle } from 'styled-components'
import { Header } from './components/static/header/header'
import { CardCourtPage } from './pages/card-court/page'
import { NewCardPage } from './pages/new-card/page'
import { CheckPage } from './pages/check/page'
import { EditCardPage } from './pages/edit-card/page'
import { useStore } from './stores/root-store/context'
import { CardPage } from './pages/card/page'
import { UserPage } from './pages/user/page'
import { CardSlider } from './stores/card-slider'
import { RegistrationPage } from './pages/auth/registration'
import { LoginPage } from './pages/auth/login'

export const MainSliderContext = createContext<CardSlider>({} as CardSlider)
export const useMainSlider = (): CardSlider => useContext(MainSliderContext)

export const App: React.FC = observer(() => {
  const { appStore, cardsStore, authStore, createCardSlider } = useStore()
  const location = useLocation()

  const [mainSlider] = useState<CardSlider>(() =>
    createCardSlider({
      cards: cardsStore.cards,
      cardWidth: 320,
      cardHeight: 500,
      cardsToShow: 5,
      cardsToSlide: 5,

      initialParamsForCardRequest: {
        search: '',
        by: '',
      },

      loadCardsConfig: {
        pagesToLoad: 2,
      },
      loadMoreCardsConfig: {
        pagesToLoad: 2,
      },
    })
  )

  //useLayoutEffect, т.к. useEffect приводит к визуальным багам
  useLayoutEffect(() => {
    if (authStore.token) {
      authStore.loadMe()
    }
  }, [authStore.token])

  return (
    <>
      <GlobalStyles isPopup={appStore.isPopupOpened} />
      <MainSliderContext.Provider value={mainSlider}>
        <AppContainer>
          <Header />

          <PageContainer>
            <Routes>
              <Route path='/' element={<CardCourtPage />} />
              <Route path='/registration' element={<RegistrationPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='card/new' element={<NewCardPage />} />
              <Route path='/card/:cardId' element={<CardPage />} />
              <Route path='card/:cardId/check' element={<CheckPage />} />
              <Route path='card/:cardId/edit' element={<EditCardPage />} />
              <Route path='user/:userName' element={<UserPage key={location.key} />} />
            </Routes>
          </PageContainer>
        </AppContainer>
      </MainSliderContext.Provider>
    </>
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
    background-color:#617eae;
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
const PageContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  padding: 40px 0;
`
