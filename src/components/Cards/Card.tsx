import React from 'react'
import { FullCard, IFullCardProps } from './Full/FullCard'
import { NewCardForm } from './New/NewCardForm'
import { CardElement, ICardElementProps } from './Element/CardElement'
import { EditCard } from './Edit/EditCard'

type CardType = 'new' | 'full' | 'element' | 'edit'

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
interface IEditCard extends IGeneralCard {
  type: 'edit'
}

export function Card(props: React.PropsWithChildren<INewCard>): React.ReactElement | null
export function Card(props: React.PropsWithChildren<IFullCard>): React.ReactElement | null
export function Card(props: React.PropsWithChildren<IElementCard>): React.ReactElement | null
export function Card(props: React.PropsWithChildren<IEditCard>): React.ReactElement | null

export function Card(
  props: INewCard | IFullCard | IElementCard | IEditCard
): React.ReactElement | null {
  if (props.type === 'new') {
    return <NewCardForm />
  } else if (props.type === 'full') {
    return <FullCard card={props.card} />
  } else if (props.type === 'element') {
    return <CardElement card={props.card} />
  } else if (props.type === 'edit') {
    return <EditCard />
  } else return null
}
