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
} from './shared-components'

interface LoginFormValues {
  name: string
  password: string
}

export const LoginPage: React.FC = registerPage(
  withAuthLogic(
    observer(() => {
      const { login } = useAuthContext()
      const { loadingState } = login

      const { register, handleSubmit } = useForm<LoginFormValues>()
      const [loginName, setLoginName] = useState('')

      const loginUser: SubmitHandler<LoginFormValues> = ({ name, password }) => {
        setLoginName(name)
        login.loginUser(name, password)
      }

      return (
        <Container>
          <AuthForm title='Вход'>
            <AuthFormInput placeholder='Логин' {...register('name', { required: true })} />
            <AuthFormInput
              placeholder='Пароль'
              type='password'
              {...register('password', { required: true })}
            />
            <AuthFormButton type='submit' onClick={handleSubmit(loginUser)}>
              Войти
            </AuthFormButton>
            {loadingState.error && (
              <AuthFormErrorBlock>
                {loadingState.wrongLoginName && <WrongLoginName loginName={loginName} />}
                {loadingState.wrongPassword && <WrongPassword />}
                {loadingState.unknownError && <UnknownError withButton={false} />}
              </AuthFormErrorBlock>
            )}
          </AuthForm>
          <ToAnotherWayOfAuth>
            Нет аккаунта? <Link to='/registration'>Зарегистрируйтесь</Link>
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
