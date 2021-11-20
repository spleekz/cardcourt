import React, { useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { CheckStoreContext } from '../CheckPage'
import { ICard } from '../../../stores/CardsStore'

interface IPrepareCheckProps {
  card: ICard
}
const PrepareCheckContainer = styled.div`
  font-size: 30px;
`

export const PrepareCheck: React.FC<IPrepareCheckProps> = observer(({ card }): JSX.Element => {
  const CheckStore = useContext(CheckStoreContext)

  return (
    <PrepareCheckContainer>
      Prepare Check for CARD {card.name}
      <button onClick={() => CheckStore.checkMode.set('play')}>Начать</button>
    </PrepareCheckContainer>
  )
})
