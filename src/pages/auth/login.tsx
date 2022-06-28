import React, { useState } from 'react'

import { observer } from 'mobx-react-lite'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { UnknownError } from 'components/messages/errors/unknown-error'
import { WrongLoginName } from 'components/messages/errors/wrong-login-name'
import { WrongPassword } from 'components/messages/errors/wrong-password'
import { YouAlreadyLoggedIn } from 'components/messages/errors/you-already-logged-in'
import { CenteredPageContent } from 'components/utility/styled'

import { useStore } from 'stores/root-store/context'

import { registerPage } from 'hocs/register-page'
import { useAuthContext, withAuthLogic } from 'hocs/with-auth-logic'

import { AuthForm } from './auth-form'
import {
  AuthButton,
  AuthFormErrorBlock,
  ToAnotherWayOfAuth,
  ToAnotherWayOfAuthLink,
} from './shared-components'
import { LoginInput } from './shared-form-fields/login-input'
import { PasswordInput } from './shared-form-fields/password-input'

type LoginFormValues = {
  name: string
  password: string
}

export const LoginPage: React.FC = registerPage(
  withAuthLogic(
    observer(() => {
      const { authStore } = useStore()

      const { login } = useAuthContext()
      const { loadingState } = login

      const formMethods = useForm<LoginFormValues>()
      const [loginName, setLoginName] = useState('')

      const [localError, setIsLocalError] = useState(false)
      const [loginNameTheSame, setLoginNameTheSame] = useState(false)

      const loginUser: SubmitHandler<LoginFormValues> = ({ name, password }) => {
        setLoginName(name)
        if (authStore.me?.name === name) {
          setIsLocalError(true)
          setLoginNameTheSame(true)
        } else {
          login.loginUser(name, password)
          setIsLocalError(false)
          setLoginNameTheSame(false)
        }
      }

      return (
        <CenteredPageContent>
          <FormContainer>
            <AuthForm title='Вход'>
              <LoginInput formMethods={formMethods} />
              <PasswordInput formMethods={formMethods} />
              <AuthButton type='submit' onClick={formMethods.handleSubmit(loginUser)}>
                Войти
              </AuthButton>
              {(loadingState.error || localError) && (
                <AuthFormErrorBlock>
                  {loadingState.wrongLoginName && <WrongLoginName loginName={loginName} />}
                  {loadingState.wrongPassword && <WrongPassword />}
                  {loginNameTheSame && <YouAlreadyLoggedIn />}
                  {loadingState.unknownError && <UnknownError withButton={false} />}
                </AuthFormErrorBlock>
              )}
            </AuthForm>
            <ToAnotherWayOfAuth>
              Нет аккаунта?{' '}
              <Link to='/registration'>
                <ToAnotherWayOfAuthLink>Зарегистрируйтесь</ToAnotherWayOfAuthLink>
              </Link>
            </ToAnotherWayOfAuth>
          </FormContainer>
        </CenteredPageContent>
      )
    }),
  ),
)

const FormContainer = styled.div``
