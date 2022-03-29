import React from 'react'
import styled from 'styled-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useStore } from '../../stores/root-store/context'
import { observer } from 'mobx-react-lite'
import { useLocation, useNavigate } from 'react-router-dom'

interface AuthFormValues {
  name: string
  password: string
}

export const AuthForm: React.FC = observer(() => {
  const { authStore } = useStore()
  const { register, handleSubmit } = useForm<AuthFormValues>()
  const navigate = useNavigate()
  const location = useLocation()

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

  const loginUser: SubmitHandler<AuthFormValues> = async ({ name, password }) => {
    await authStore.loginUser(name, password)
    redirect()
  }
  const registerUser: SubmitHandler<AuthFormValues> = async ({ name, password }) => {
    await authStore.registerUser(name, password)
    redirect()
  }

  return (
    <Container>
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
      </Form>
    </Container>
  )
})

const Container = styled.div`
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
