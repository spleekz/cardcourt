import React from 'react'
import { FullCard, IFullCardProps } from './Full/FullCard'
import { NewCardForm } from './New/NewCardForm'
import { CardElement, ICardElementProps } from './Element/CardElement'

type CardType = 'new' | 'full' | 'element'

interface IGeneralCard {
  type: CardType
}
interface INewCard extends IGeneralCard {
  type: 'new'
}
interface IFullCard extends IGeneralCard {
  type: 'full'
  card: IFullCardProps['card']
}
interface IElementCard extends IGeneralCard {
  type: 'element'
  card: ICardElementProps['card']
}

export function Card(props: React.PropsWithChildren<INewCard>): React.ReactElement | null
export function Card(props: React.PropsWithChildren<IFullCard>): React.ReactElement | null
export function Card(props: React.PropsWithChildren<IElementCard>): React.ReactElement | null

export function Card(props: INewCard | IFullCard | IElementCard): React.ReactElement | null {
  if (props.type === 'new') {
    return <NewCardForm />
  } else if (props.type === 'full') {
    return <FullCard card={props.card} />
  } else if (props.type === 'element') {
    return <CardElement card={props.card} />
  } else return null
}
