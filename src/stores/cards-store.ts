import { makeAutoObservable } from 'mobx'
import { Cards, SendedCard, UpdatedCard } from '../api/api'
import { createCard, updateCard } from '../api'
import { ActionToUpdateCards } from './stores-utility-types'
import { CreateCardResponsePromise, UpdateCardResponsePromise } from '../api/api-utility-types'

export class CardsStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  cards: Cards = []

  setCards: ActionToUpdateCards = (cards) => {
    this.cards.length = 0
    this.cards.push(...cards)
  }
  pushCards: ActionToUpdateCards = (cards) => {
    this.cards.push(...cards)
  }

  createCard(card: SendedCard): CreateCardResponsePromise {
    return createCard(card)
  }
  updateCard(card: UpdatedCard): UpdateCardResponsePromise {
    return updateCard(card)
  }
}
