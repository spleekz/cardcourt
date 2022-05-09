import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { UnknownError } from '../../components/messages/errors/unknown-error'
import { WrongLoginName } from '../../components/messages/errors/wrong-login-name'
import { WrongPassword } from '../../components/messages/errors/wrong-password'
import { AuthForm } from './auth-form'
import { useAuthContext, withAuthLogic } from '../../hocs/with-auth-logic'
import { registerPage } from '../../hocs/register-page'
import {
  AuthFormButton,
  AuthFormErrorBlock,
  AuthFormInput,
  ToAnotherWayOfAuth,
  ToAnotherWayOfAuthLink,
} from './shared-components'
import { useStore } from '../../stores/root-store/context'
import { YouAlreadyLoggedIn } from '../../components/messages/errors/you-already-logged-in'

interface LoginFormValues {
  name: string
  password: string
}

export const LoginPage: React.FC = registerPage(
  withAuthLogic(
    observer(() => {
      const { authStore } = useStore()

      const { login } = useAuthContext()
      const { loadingState } = login

      const { register, handleSubmit } = useForm<LoginFormValues>()
      const [loginName, setLoginName] = useState('')

      const [localError, setIsLocalError] = useState(false)
      const [loginNameTheSame, setLoginNameTheSame] = useState(false)

      const loginUser: SubmitHandler<LoginFormValues> = ({ name, password }) => {
        const trimmedName = name.trim()
        setLoginName(trimmedName)
        if (authStore.me?.name === trimmedName) {
          setIsLocalError(true)
          setLoginNameTheSame(true)
        } else {
          login.loginUser(trimmedName, password)
          setIsLocalError(false)
          setLoginNameTheSame(false)
        }
      }

      return (
        <Container>
          <AuthForm title='Вход'>
            <AuthFormInput
              placeholder='Логин'
              maxLength={14}
              {...register('name', { required: true })}
            />
            <AuthFormInput
              placeholder='Пароль'
              type='password'
              {...register('password', { required: true })}
            />
            <AuthFormButton type='submit' onClick={handleSubmit(loginUser)}>
              Войти
            </AuthFormButton>
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
        </Container>
      )
    })
  )
)

const Container = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
