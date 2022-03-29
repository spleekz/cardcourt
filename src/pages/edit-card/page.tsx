import { observer } from 'mobx-react-lite'
import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { CardRef } from '../../components/cards/card-ref'
import { useCard } from '../../hooks/use-card'
import { registerPage } from '../../hocs/register-page'
import { Preloader } from '../../components/icons/preloader'

export const EditCardPage: React.FC = registerPage(
  observer(() => {
    const { cardId } = useParams()

    const card = useCard(cardId)

    if (!card) {
      return <Preloader />
    }

    return (
      <Container>
        <CardRef type='form' card={card} />
      </Container>
    )
  }),
  { isProtected: true }
)

const Container = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
