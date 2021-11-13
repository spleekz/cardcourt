import React, { FC } from 'react'
import styled from 'styled-components'
import { useStore } from '../../stores/RootStore/RootStoreContext'
import { CardList } from './CardList'

const CardsPageContainer = styled.div``

export const CardsPage: FC = (): JSX.Element => {
  const { CardsStore } = useStore()

  return (
    <CardsPageContainer>
      <CardList cardList={CardsStore.cards} />
    </CardsPageContainer>
  )
}
