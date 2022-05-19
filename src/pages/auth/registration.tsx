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
  AuthButton,
  AuthFormErrorBlock,
  AuthFormInput,
  ToAnotherWayOfAuth,
  ToAnotherWayOfAuthLink,
} from './shared-components'
import { CenteredPageContent } from '../../components/utility/styled'

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
        const trimmedName = name.trim()
        setRegisterName(trimmedName)
        registration.registerUser(trimmedName, password)
      }

      return (
        <CenteredPageContent>
          <FormContainer>
            <AuthForm title='Регистрация'>
              <AuthFormInput
                placeholder='Придумайте логин'
                maxLength={14}
                {...register('name', { required: true })}
              />
              <AuthFormInput
                placeholder='Придумайте пароль'
                type='password'
                {...register('password', { required: true })}
              />
              <AuthButton onClick={handleSubmit(registerUser)}>Зарегистрироваться</AuthButton>
              {loadingState.error && (
                <AuthFormErrorBlock>
                  {loadingState.longRegisterName && <LongRegisterName />}
                  {loadingState.sameRegisterName && <SameRegisterName registerName={registerName} />}
                  {loadingState.unknownError && <UnknownError withButton={false} />}
                </AuthFormErrorBlock>
              )}
            </AuthForm>
            <ToAnotherWayOfAuth>
              Уже зарегистрированы?{' '}
              <Link to='/login'>
                <ToAnotherWayOfAuthLink>Войдите</ToAnotherWayOfAuthLink>
              </Link>
            </ToAnotherWayOfAuth>
          </FormContainer>
        </CenteredPageContent>
      )
    })
  )
)

const FormContainer = styled.div``
