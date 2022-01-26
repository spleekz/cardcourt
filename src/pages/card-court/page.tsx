import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useStore } from '../../stores/root-store/context'
import { CardCourt } from './court'
import { registerPage } from '../../hocs/register-page'

export const CardCourtPage: React.FC = registerPage(
  observer(() => {
    const { cardsStore } = useStore()

    useEffect(() => {
      cardsStore.loadCards()
    }, [])

    return (
      <CardsPageContainer>
        <CardCourt cardList={cardsStore.cards} />
      </CardsPageContainer>
    )
  })
)

const CardsPageContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
