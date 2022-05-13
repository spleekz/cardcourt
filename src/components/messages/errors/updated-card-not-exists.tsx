import React from 'react'
import { ErrorMessage } from './error-message'

export const UpdatedCardNotExists: React.FC = () => {
  return <ErrorMessage text={`Не существует карточки, которую Вы хотите обновить`} withButton={true} />
}
