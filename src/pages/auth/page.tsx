import React from 'react'
import styled from 'styled-components'
import { AuthForm } from './auth-form'

export const AuthPage: React.FC = () => {
  return (
    <AuthPageContainer>
      <AuthForm />
    </AuthPageContainer>
  )
}

const AuthPageContainer = styled.div`
  display: flex;
  justify-content: center;
`
