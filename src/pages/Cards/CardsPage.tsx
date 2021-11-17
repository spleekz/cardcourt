import React from 'react'
import styled from 'styled-components'
import { useStore } from '../../stores/RootStore/RootStoreContext'
import { CardsSection } from './CardsSection'

const CardsPageContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const CardsPage: React.FC = (): JSX.Element => {
  const { CardsStore } = useStore()

  return (
    <CardsPageContainer>
      <CardsSection cardList={CardsStore.cards} />
    </CardsPageContainer>
  )
}
