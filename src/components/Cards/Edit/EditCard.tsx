import { observer } from 'mobx-react-lite'
import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useCard } from '../../../hooks/useCard'

const EdicCardContainer = styled.div``

export const EditCard: React.FC = observer(() => {
  const { cardId } = useParams()

  const card = useCard(cardId)

  return <>{card && <EdicCardContainer>card {card.id} edit</EdicCardContainer>}</>
})
