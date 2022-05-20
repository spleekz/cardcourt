import React from 'react'

import { Card } from 'api/api'

import { CurrentCardStore } from 'stores/current-card-store'

interface PropsForEveryCardVariant {
  width: number
  height: number
}

export type PropsForCardVariant = PropsForEveryCardVariant & { card: Card }

export type PropsForCardFormVariant = PropsForEveryCardVariant & { cardStore?: CurrentCardStore }

export type CardVariantComponent<
  T extends PropsForCardVariant | PropsForCardFormVariant = PropsForCardVariant,
> = React.FC<T>
