import React from 'react'
import { ErrorMessage } from './error-message'

export const UserNotFound: React.FC<{ userName: string }> = ({ userName }) => {
  return <ErrorMessage text={`Пользователь ${userName} не найден`} />
}
