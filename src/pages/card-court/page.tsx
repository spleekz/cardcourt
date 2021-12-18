import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { useStore } from '../../stores/root-store/context'
import { CardCourt } from './court'

const CardsPageContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const CardCourtPage: React.FC = observer(() => {
  const { cardsStore } = useStore()

  return (
    <CardsPageContainer>
      <CardCourt cardList={cardsStore.cards} />
    </CardsPageContainer>
  )
})
