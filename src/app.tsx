import { observer } from 'mobx-react-lite'
import React, { createContext, useContext, useLayoutEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import styled, { createGlobalStyle } from 'styled-components'
import { Header } from './components/header/header'
import { CardCourtPage } from './pages/card-court/page'
import { NewCardPage } from './pages/new-card/page'
import { CheckPage } from './pages/check/page'
import { EditCardPage } from './pages/edit-card/page'
import { CardDonePopup } from './components/popups/card-done'
import { useStore } from './stores/root-store/context'
import { CardPage } from './pages/card/page'
import { AuthPage } from './pages/auth/page'
import { UserPage } from './pages/user/page'
import { CardSlider } from './stores/card-slider'
import { PortalToBody } from './components/portal-to-body'
import { Preloader } from './components/icons/preloader'

interface Popup {
  value: boolean
  set: React.Dispatch<React.SetStateAction<boolean>>
}

interface Popups {
  cardDone: Popup
}

export const PopupsContext = createContext<Popups>({} as Popups)
export const usePopupContext = (): Popups => useContext(PopupsContext)

export const MainSliderContext = createContext<CardSlider>({} as CardSlider)
export const useMainSlider = (): CardSlider => useContext(MainSliderContext)

export const App: React.FC = observer(() => {
  const { cardsStore, authStore, appStore, createCardSlider } = useStore()

  const [mainSlider] = useState<CardSlider>(() =>
    createCardSlider({
      cards: cardsStore.cards,
      cardWidth: 320,
      cardHeight: 500,
      cardsToShow: 5,
      cardsToSlide: 5,
      loadCardsConfig: {
        params: {
          pagesToLoad: 2,
          pageSize: 5,
        },
        actionToUpdateCards: cardsStore.setCards,
      },
      loadMoreCardsConfig: {
        params: {
          pagesToLoad: 2,
          pageSize: 5,
        },
        actionToUpdateCards: cardsStore.pushCards,
      },
    })
  )

  const [isCardDonePopup, setIsCardDonePopup] = useState<boolean>(false)
  const isAnyPopupOpened = isCardDonePopup

  const PopupsForContext: Popups = {
    cardDone: {
      value: isCardDonePopup,
      set: setIsCardDonePopup,
    },
  }

  //useLayoutEffect, т.к. useEffect приводит к визуальным багам
  useLayoutEffect(() => {
    if (authStore.token) {
      authStore.loadMe()
    }
  }, [authStore.token])

  return (
    <>
      <GlobalStyles isPopup={isAnyPopupOpened} />

      {!authStore.isLoadingMe ? (
        <MainSliderContext.Provider value={mainSlider}>
          <PopupsContext.Provider value={PopupsForContext}>

            <AppContainer>
              <PortalToBody>
                <CardDonePopup
                  isOpened={isCardDonePopup}
                  title={appStore.page === 'new' ? 'Карточка создана!' : 'Карточка обновлена!'}
                />
              </PortalToBody>

              <Header />

              <PageContainer>
                <Routes>
                  <Route path='/' element={<CardCourtPage />} />
                  <Route path='/auth' element={<AuthPage />} />
                  <Route path='card/new' element={<NewCardPage />} />
                  <Route path='/card/:cardId' element={<CardPage />} />
                  <Route path='card/:cardId/check' element={<CheckPage />} />
                  <Route path='card/:cardId/edit' element={<EditCardPage />} />
                  <Route path='user/:userName' element={<UserPage />} />
                </Routes>
              </PageContainer>
            </AppContainer>

          </PopupsContext.Provider>
        </MainSliderContext.Provider>
      ) : (
        <PortalToBody>
          <Preloader />
        </PortalToBody>
      )}
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
`
