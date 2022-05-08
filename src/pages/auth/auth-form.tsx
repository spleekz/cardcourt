import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'

interface AuthFormProps {
  title: string
}

export const AuthForm: React.FC<AuthFormProps> = observer(({ title, children }) => {
  return (
    <Container>
      <FormBlock>
        <Title>{title}</Title>
        <Form>{children}</Form>
      </FormBlock>
    </Container>
  )
})

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 12px;
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
