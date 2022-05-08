import React, { useState } from 'react'
import styled from 'styled-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useStore } from '../../stores/root-store/context'
import { observer } from 'mobx-react-lite'
import { useLocation, useNavigate } from 'react-router-dom'
import { WrongPassword } from '../../components/messages/errors/wrong-password'
import { WrongLoginName } from '../../components/messages/errors/wrong-login-name'
import { UnknownError } from '../../components/messages/errors/unknown-error'
import { SameRegisterName } from '../../components/messages/errors/same-register-name'
import { LongRegisterName } from '../../components/messages/errors/long-register-name'

interface AuthFormValues {
  name: string
  password: string
}

export const AuthForm: React.FC = observer(() => {
  const { authStore } = useStore()
  const { register, handleSubmit } = useForm<AuthFormValues>()
  const navigate = useNavigate()
  const location = useLocation()

  const [registerName, setRegisterName] = useState('')
  const [loginName, setLoginName] = useState('')

  const redirect = (): void => {
    if (authStore.token) {
      if (location.state) {
        if (location.state.prevPath) {
          navigate(location.state.prevPath)
        }
      } else {
        navigate('/')
      }
    }
  }

  const registerUser: SubmitHandler<AuthFormValues> = ({ name, password }) => {
    setRegisterName(name)
    authStore.registerUser(name, password)
  }
  const loginUser: SubmitHandler<AuthFormValues> = ({ name, password }) => {
    setLoginName(name)
    authStore.loginUser(name, password)
  }

  if (authStore.registerLoadingState.isLoaded || authStore.loginLoadingState.isLoaded) {
    redirect()
  }

  return (
    <Container>
      <FormBlock>
        <Title>Авторизация</Title>
        <Form>
          <Input placeholder='Логин' {...register('name', { required: true })} />
          <Input type='password' placeholder='Пароль' {...register('password', { required: true })} />
          <Buttons>
            <Button type='submit' onClick={handleSubmit(loginUser)}>
              Войти
            </Button>
            <Button type='submit' onClick={handleSubmit(registerUser)}>
              Зарегистрироваться
            </Button>
          </Buttons>
          {(authStore.registerLoadingState.isLoadingFailed ||
            authStore.loginLoadingState.isLoadingFailed) && (
            <ErrorBlock>
              {authStore.registerLoadingState.sameRegisterName && (
                <SameRegisterName registerName={registerName} />
              )}
              {authStore.loginLoadingState.longRegisterName && <LongRegisterName />}
              {authStore.loginLoadingState.wrongPassword && <WrongPassword />}
              {authStore.loginLoadingState.wrongLoginName && <WrongLoginName loginName={loginName} />}
              {(authStore.registerLoadingState.isUnknownError ||
                authStore.loginLoadingState.isUnknownError) && <UnknownError withButton={false} />}
            </ErrorBlock>
          )}
        </Form>
      </FormBlock>
    </Container>
  )
})

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`
const FormBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 550px;
  min-height: 475px;
  background-color: #ffffff;
  padding: 15px;
  box-shadow: 0px 0px 16px 5px rgba(34, 60, 80, 0.2);
`
const Title = styled.div`
  font-size: 35px;
  font-weight: bold;
`
const Form = styled.form`
  margin: auto;
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`
const Input = styled.input`
  margin-bottom: 16px;
  font-size: 42px;
  background-color: #ffffff;
  border-bottom: 1px solid #000000;
  font-weight: bold;
  padding: 3px;
`
const Buttons = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
`
const Button = styled.button`
  font-size: 24px;
  margin-right: 15px;
  color: #ffffff;
  background-color: #2e87ec;
  padding: 5px;
  border-radius: 3px;
`
const ErrorBlock = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 0;
`
