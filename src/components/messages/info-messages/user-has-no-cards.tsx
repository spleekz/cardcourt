import React from 'react'
import { InfoMessage, InfoMessageVariantProps } from './info-messages'

export const UserHasNoCards: React.FC<InfoMessageVariantProps> = ({fontSize}) => {
  return <InfoMessage text={`У пользователя нет карточек`} fontSize={fontSize} />
}
