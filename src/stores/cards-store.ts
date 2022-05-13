import { makeAutoObservable } from 'mobx'
import { Cards, SendedCard } from '../api/api'
import { createCard } from '../api'
import { CreateCardResponsePromise } from '../api/api-utility-types'

export class CardsStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  cards: Cards = []

  createCard(card: SendedCard): CreateCardResponsePromise {
    return createCard(card)
  }
}
