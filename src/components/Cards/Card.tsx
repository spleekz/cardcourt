import React from 'react'
import { FullCard } from './full/full-card'
import { CardElement, ICardElementProps } from './element/element'
import { CardForm } from './form/card-form'
import { ICard } from '../../stores/cards-store'

type CardType = 'form' | 'full' | 'element'

interface IGeneralCard {
  type: CardType
}
interface IFormCard extends IGeneralCard {
  type: 'form'
  card?: ICard
}
interface IFullCard extends IGeneralCard {
  type: 'full'
}
interface IElementCard extends IGeneralCard {
  type: 'element'
  card: ICardElementProps['card']
}

export function Card(props: React.PropsWithChildren<IFormCard>): React.ReactElement | null
export function Card(props: React.PropsWithChildren<IFullCard>): React.ReactElement | null
export function Card(props: React.PropsWithChildren<IElementCard>): React.ReactElement | null

export function Card(props: IFormCard | IFullCard | IElementCard): React.ReactElement | null {
  if (props.type === 'form') {
    if (props.card) {
      return <CardForm card={props.card} />
    } else return <CardForm />
  } else if (props.type === 'full') {
    return <FullCard />
  } else if (props.type === 'element') {
    return <CardElement card={props.card} />
  } else return null
}
