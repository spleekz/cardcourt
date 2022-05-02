import React from 'react'
import { ErrorMessage } from './error-message'

export const CardNotFound: React.FC = () => {
  return <ErrorMessage text={`Карточка не найдена`} />
}
