import React from 'react'

import { ErrorMessage } from './error-message'

export const NotCardAuthor: React.FC = () => {
  return <ErrorMessage text={`Вы не являетесь автором этой карточки`} withButton={true} />
}
