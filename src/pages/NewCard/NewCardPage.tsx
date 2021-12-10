import React from 'react'
import styled from 'styled-components'
import { Card } from '../../components/Cards/Card'

const NewCardPageContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const NewCardPage: React.FC = () => {
  return (
    <NewCardPageContainer>
      <Card type='new' />
    </NewCardPageContainer>
  )
}
