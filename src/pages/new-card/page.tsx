import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { FormCard } from '../../components/card/variants/form-card/form-card'
import { registerPage } from '../../hocs/register-page'
import { getCardWidthByHeight } from '../../lib/cards'

export const NewCardPage: React.FC = registerPage(
  observer(() => {
    const cardHeight = 780
    const cardWidth = getCardWidthByHeight(cardHeight)

    return (
      <Container>
        <FormCard width={cardWidth} height={cardHeight} />
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
