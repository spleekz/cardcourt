import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { AuthForm } from './auth-form'
import { registerPage } from '../../hocs/register-page'

export const AuthPage: React.FC = registerPage(
  observer(() => {
    return (
      <Container>

        <AuthForm />

      </Container>
    )
  })
)

const Container = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
