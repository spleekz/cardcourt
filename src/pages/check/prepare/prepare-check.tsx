import React, { useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { CheckStoreContext } from '../page'
import { Card } from '../../../api/api'

interface IPrepareCheckProps {
  card: Card
}

export const PrepareCheck: React.FC<IPrepareCheckProps> = observer(({ card }) => {
  const CheckStore = useContext(CheckStoreContext)

  return (
    <Container>

      Prepare Check for CARD {card.name}
      <button onClick={() => CheckStore.setCheckMode('play')}>Начать</button>

    </Container>
  )
})

const Container = styled.div`
  font-size: 30px;
`
