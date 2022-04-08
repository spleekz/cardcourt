import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { useCardFromURL } from '../../hooks/use-card-from-url'
import { registerPage } from '../../hocs/register-page'
import { Preloader } from '../../components/icons/preloader'
import { FormCard } from '../../components/card/variants/form-card/form-card'
import { getCardWidthByHeight } from '../../utils/cards'

export const EditCardPage: React.FC = registerPage(
  observer(() => {
    const card = useCardFromURL()

    if (!card) {
      return <Preloader />
    }

    const cardHeight = 780
    const cardWidth = getCardWidthByHeight(cardHeight)

    return (
      <Container>
        <FormCard card={card} width={cardWidth} height={cardHeight} />
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
