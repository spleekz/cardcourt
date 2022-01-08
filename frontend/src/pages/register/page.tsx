import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { AuthForm } from '../auth/auth-form'

export const RegisterPage: React.FC = () => {
  return (
    <RegisterPageContainer>
      Register
      {/* <AuthForm /> */}
      <RedirectContainer>
      </RedirectContainer>
    </RegisterPageContainer>
  )
}

const RegisterPageContainer = styled.div``
const RedirectContainer = styled.div``
