import React, { useState } from 'react'

import { observer } from 'mobx-react-lite'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { LongRegisterName } from 'components/messages/errors/long-register-name'
import { SameRegisterName } from 'components/messages/errors/same-register-name'
import { UnknownError } from 'components/messages/errors/unknown-error'
import { CenteredPageContent } from 'components/utility/styled'

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

type RegisterUserValues = {
  name: string
  password: string
}

export const RegistrationPage: React.FC = registerPage(
  withAuthLogic(
    observer(() => {
      const { registration } = useAuthContext()
      const { loadingState } = registration

      const formMethods = useForm<RegisterUserValues>()
      const [registerName, setRegisterName] = useState('')

      const registerUser: SubmitHandler<RegisterUserValues> = ({ name, password }) => {
        setRegisterName(name)
        registration.registerUser(name, password)
      }

      return (
        <CenteredPageContent>
          <FormContainer>
            <AuthForm title='Регистрация'>
              <LoginInput formMethods={formMethods} />
              <PasswordInput formMethods={formMethods} />
              <AuthButton onClick={formMethods.handleSubmit(registerUser)}>
                Зарегистрироваться
              </AuthButton>
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
    }),
  ),
)

const FormContainer = styled.div``
