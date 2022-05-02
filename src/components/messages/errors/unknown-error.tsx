import React from 'react'
import { ErrorMessage } from './error-message'

export const UnknownError: React.FC = () => {
  return <ErrorMessage text={`Неизвестная ошибка`} />
}
