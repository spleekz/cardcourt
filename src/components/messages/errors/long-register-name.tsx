import React from 'react'

import { ErrorMessage } from './error-message'

export const LongRegisterName: React.FC = () => {
  return <ErrorMessage text={`Слишком длинное имя`} withButton={false} />
}
