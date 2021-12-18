import React from 'react'
import styled from 'styled-components'
import { Card } from '../../components/cards/card'

export const NewCardPage: React.FC = () => {
  return (
    <NewCardPageContainer>
      <Card type='form' />
    </NewCardPageContainer>
  )
}
const NewCardPageContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
