import React from 'react'
import styled from 'styled-components'
import { NewCardForm } from './NewCardForm'

const NewCardPageContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const NewCardPage: React.FC = () => {
  return (
    <NewCardPageContainer>
      <NewCardForm />
    </NewCardPageContainer>
  )
}
