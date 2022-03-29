import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { registerPage } from '../../hocs/register-page'
import { Preloader } from '../../components/icons/preloader'
import { useCardFromURL } from '../../hooks/use-card-from-url'
import { FullCard } from '../../components/cards/full/full-card'

export const CardPage: React.FC = registerPage(
  observer(() => {
    const card = useCardFromURL()

    if (!card) {
      return <Preloader />
    }

    return (
      <Container>
        <FullCard card={card} />
      </Container>
    )
  }),
  { isRootPath: true }
)

const Container = styled.div``
