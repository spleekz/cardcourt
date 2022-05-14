import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { FormCard } from '../../components/card/variants/form-card/form-card'
import { getCardWidthByHeight } from '../../utils/cards'
import { CurrentCardStore } from '../../stores/current-card-store'

interface Props {
  editedCardStore: CurrentCardStore
}

export const EditCardPageOriginalContent: React.FC<Props> = observer(({ editedCardStore }) => {
  const cardHeight = 780
  const cardWidth = getCardWidthByHeight(cardHeight)

  return (
    <>
      {editedCardStore.card && (
        <Container>
          <FormCard cardStore={editedCardStore} width={cardWidth} height={cardHeight} />
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
