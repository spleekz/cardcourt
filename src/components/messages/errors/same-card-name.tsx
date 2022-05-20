import React from 'react'

import { ErrorMessage } from './error-message'

export const SameCardName: React.FC = () => {
  return (
    <ErrorMessage
      text={`Вы уже создали карточку с этим названием`}
      withButton={false}
      fontSize={22}
      height={'120px'}
    />
  )
}
