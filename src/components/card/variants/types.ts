import React from 'react'
import { Card } from '../../../api/api'
import { PartialBy } from '../../../basic-utility-types'

interface PropsForCardVariant {
  card: Card
  width: number
  height: number
}

export type PropsForCardForm = PartialBy<PropsForCardVariant, 'card'>

export type CardVariantComponent<
  T extends PropsForCardVariant | PropsForCardForm = PropsForCardVariant
> = React.FC<T>
