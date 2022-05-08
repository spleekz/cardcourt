import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { AuthForm } from './auth-form'
import { registerPage } from '../../hocs/register-page'
import { useStore } from '../../stores/root-store/context'
import { ScreenPreloader } from '../../components/icons/screen-preloader'

export const AuthPage: React.FC = registerPage(
  observer(() => {
    const { authStore } = useStore()

    return (
      <Container>
        <AuthForm />
        {(authStore.loginLoadingState.isLoading || authStore.registerLoadingState.isLoading) && (
          <ScreenPreloader blackout={true} />
        )}
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
