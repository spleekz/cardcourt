import React from 'react'

import { ErrorMessage } from './error-message'

interface Props {
  registerName: string
}

export const SameRegisterName: React.FC<Props> = ({ registerName }) => {
  return <ErrorMessage text={`Имя ${registerName} уже занято`} withButton={false} />
}
