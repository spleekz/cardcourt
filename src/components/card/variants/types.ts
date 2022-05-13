import React from 'react'
import { Card } from '../../../api/api'
import { CurrentCardStore } from '../../../stores/current-card-store'

interface PropsForCardVariant {
  card: Card
  width: number
  height: number
}

export type PropsForCardForm = {
  cardStore?: CurrentCardStore
  width: number
  height: number
}

export type CardVariantComponent<
  T extends PropsForCardVariant | PropsForCardForm = PropsForCardVariant
> = React.FC<T>
