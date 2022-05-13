import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { Card } from '../../api/api'
import { FormCard } from '../../components/card/variants/form-card/form-card'
import { getCardWidthByHeight } from '../../utils/cards'

interface Props {
  card: Card | null
}

export const EditCardPageOriginalContent: React.FC<Props> = observer(({ card }) => {
  const cardHeight = 780
  const cardWidth = getCardWidthByHeight(cardHeight)

  return (
    <>
      {card && (
        <Container>
          <FormCard card={card} width={cardWidth} height={cardHeight} />
        </Container>
      )}
    </>
  )
})

const Container = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
