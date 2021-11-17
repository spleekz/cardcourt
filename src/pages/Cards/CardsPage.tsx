import React, { FC } from 'react'
import styled from 'styled-components'
import { useStore } from '../../stores/RootStore/RootStoreContext'
import { CardList } from './CardList'

const CardsPageContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const CardsPage: FC = (): JSX.Element => {
  const { CardsStore } = useStore()

  return (
    <CardsPageContainer>
      <CardList cardList={CardsStore.cards} />
    </CardsPageContainer>
  )
}
