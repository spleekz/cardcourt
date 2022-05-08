import React from 'react'
import { ErrorMessage } from './error-message'

export const WrongPassword: React.FC = () => {
  return <ErrorMessage text={`Неверный пароль`} />
}
