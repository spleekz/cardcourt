import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Header } from './components/Header'
import { Cards } from './pages/Cards'
import { useStore } from './stores/RootStore/RootStoreContext'

const GlobalStyles = createGlobalStyle`
 body {
  margin:0;
  padding:0;
  box-sizing:border-box;
  background-color:#89a4ff;
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
        <Cards cardList={CardsStore.cards} />
      </AppContainer>
    </>
  )
})
