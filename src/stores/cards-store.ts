import { makeAutoObservable } from 'mobx'
import { Cards, SendedCard, UpdatedCard } from '../api/api'
import { createCard, updateCard } from '../api'
import { CreateCardResponsePromise, UpdateCardResponsePromise } from '../api/api-utility-types'

export class CardsStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  cards: Cards = []

  createCard(card: SendedCard): CreateCardResponsePromise {
    return createCard(card)
  }
  updateCard(card: UpdatedCard): UpdateCardResponsePromise {
    return updateCard(card)
  }
}
