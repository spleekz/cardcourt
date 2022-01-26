import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { AuthForm } from './auth-form'
import { registerPage } from '../../hocs/register-page'

export const AuthPage: React.FC = registerPage(
  observer(() => {
    return (
      <AuthPageContainer>
        <AuthForm />
      </AuthPageContainer>
    )
  })
)

const AuthPageContainer = styled.div`
  display: flex;
  justify-content: center;
`
