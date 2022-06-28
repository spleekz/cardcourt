import React from 'react'

import { ErrorMessage } from './error-message'

type Props = {
  loginName: string
}

export const WrongLoginName: React.FC<Props> = ({ loginName }) => {
  return <ErrorMessage text={`Пользователь ${loginName} не найден`} withButton={false} />
}
