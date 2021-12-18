import React from 'react'
import { FullCard } from './Full/FullCard'
import { CardElement, ICardElementProps } from './Element/CardElement'
import { CardForm } from './Form/CardForm'
import { ICard } from '../../stores/CardsStore'

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
