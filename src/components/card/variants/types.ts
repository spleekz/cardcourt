import React from 'react'
import { Card } from '../../../api/api'

interface PropsForCardVariant {
  card: Card
  width: number
  height: number
}

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type PropsForCardForm = PartialBy<PropsForCardVariant, 'card'>

export type CardVariantComponent<
  T extends PropsForCardVariant | PropsForCardForm = PropsForCardVariant
> = React.FC<T>
