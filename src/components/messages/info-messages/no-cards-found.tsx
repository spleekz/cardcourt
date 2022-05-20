import React from 'react'

import { InfoMessage, InfoMessageVariantProps } from './info-messages'

type Props = InfoMessageVariantProps & { search: string }

export const NoCardsFound: React.FC<Props> = ({ search, fontSize }) => {
  return <InfoMessage text={`По запросу "${search}" ничего не найдено `} fontSize={fontSize} />
}
