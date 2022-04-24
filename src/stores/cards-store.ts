import { makeAutoObservable } from 'mobx'
import { Cards, SendedCard, UpdatedCard } from '../api/api'
import { api, updateCard } from '../api'
import { ActionToUpdateCards } from './utility-types'

export class CardsStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  cards: Cards = []
  //Обновляем массив через push.apply, чтобы не терялась ссылка на него (требуется для слайдера)
  setCards: ActionToUpdateCards = (cards) => {
    const prevCards = this.cards
    prevCards.length = 0
    prevCards.push.apply(prevCards, cards)
  }
  pushCards: ActionToUpdateCards = (cards) => {
    this.cards.push.apply(this.cards, cards)
  }

  addCard(card: SendedCard): void {
    api.card.createCard(card)
  }
  updateCard(card: UpdatedCard): void {
    updateCard(card)
  }
}
