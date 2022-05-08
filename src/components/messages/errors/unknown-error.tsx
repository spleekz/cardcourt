import React from 'react'
import { ErrorMessage } from './error-message'

interface Props {
  withButton: boolean
}

export const UnknownError: React.FC<Props> = ({ withButton }) => {
  return <ErrorMessage text={`Неизвестная ошибка`} withButton={withButton} />
}
