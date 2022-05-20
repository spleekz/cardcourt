import React from 'react'

import { ErrorMessage } from './error-message'

export const YouAlreadyLoggedIn: React.FC = () => {
  return <ErrorMessage text={`Вы уже вошли под этим именем`} withButton={false} />
}
