import React from 'react'
import { InfoMessage, InfoMessageVariantProps } from './info-messages'

export const NoCardsOnServer: React.FC<InfoMessageVariantProps> = ({ fontSize }) => {
  return <InfoMessage text={`Пусто. Никто не хочет создавать карточки :(`} fontSize={fontSize} />
}
