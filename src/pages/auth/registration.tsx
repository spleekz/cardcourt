import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { LongRegisterName } from '../../components/messages/errors/long-register-name'
import { SameRegisterName } from '../../components/messages/errors/same-register-name'
import { UnknownError } from '../../components/messages/errors/unknown-error'
import { AuthForm } from './auth-form'
import { useAuthContext, withAuthLogic } from '../../hocs/with-auth-logic'
import { registerPage } from '../../hocs/register-page'
import {
  AuthFormButton,
  AuthFormErrorBlock,
  AuthFormInput,
  ToAnotherWayOfAuth,
} from './shared-components'

interface RegisterUserValues {
  name: string
  password: string
}

export const RegistrationPage: React.FC = registerPage(
  withAuthLogic(
    observer(() => {
      const { registration } = useAuthContext()
      const { loadingState } = registration

      const { register, handleSubmit } = useForm<RegisterUserValues>()
      const [registerName, setRegisterName] = useState('')

      const registerUser: SubmitHandler<RegisterUserValues> = ({ name, password }) => {
        setRegisterName(name)
        registration.registerUser(name, password)
      }

      return (
        <Container>
          <AuthForm title='Регистрация'>
            <AuthFormInput placeholder='Придумайте логин' {...register('name', { required: true })} />
            <AuthFormInput
              placeholder='Придумайте пароль'
              type='password'
              {...register('password', { required: true })}
            />
            <AuthFormButton onClick={handleSubmit(registerUser)}>Зарегистрироваться</AuthFormButton>
            {loadingState.isLoadingFailed && (
              <AuthFormErrorBlock>
                {loadingState.longRegisterName && <LongRegisterName />}
                {loadingState.sameRegisterName && <SameRegisterName registerName={registerName} />}
                {loadingState.isUnknownError && <UnknownError withButton={false} />}
              </AuthFormErrorBlock>
            )}
          </AuthForm>
          <ToAnotherWayOfAuth>
            Уже зарегистрированы? <Link to='/login'>Войдите</Link>
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
