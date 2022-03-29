import React from 'react'
import { CardElement } from '../card-slider/element/carcass'
import { CardForm } from './form/card-form'
import { Card } from '../../api/api'

type CardType = 'form' | 'full' | 'element'

interface IGeneralCard {
  type: CardType
}
interface IFormCard extends IGeneralCard {
  type: 'form'
  card?: Card
}
interface IFullCard extends IGeneralCard {
  type: 'full'
}
interface IElementCard extends IGeneralCard {
  type: 'element'
  card: Card
  width?: number
  height?: number
}

export function CardRef(props: React.PropsWithChildren<IFormCard>): React.ReactElement | null
export function CardRef(props: React.PropsWithChildren<IFullCard>): React.ReactElement | null
export function CardRef(props: React.PropsWithChildren<IElementCard>): React.ReactElement | null

export function CardRef(props: IFormCard | IFullCard | IElementCard): React.ReactElement | null {
  if (props.type === 'form') {
    if (props.card) {
      return <CardForm card={props.card} />
    } else return <CardForm />
  } else if (props.type === 'element') {
    return <CardElement card={props.card} width={props.width} height={props.height} />
  } else return null
}
