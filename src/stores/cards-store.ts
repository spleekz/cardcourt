import { makeAutoObservable } from 'mobx'
import { Card, Cards, SendedCard, UpdatedCard } from '../api/api'
import { api } from '../api'
import cardConfig from './card-config.json'
import { ActionToUpdateCards } from './utility-types'

interface CardSize {
  width: number
  height: number
}

export class CardsStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  defaultCardSize: CardSize = {
    width: cardConfig.width,
    height: cardConfig.height,
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

  cardId: string | null = null
  setCardId(id: string | null): void {
    this.cardId = id

    if (this.cardId) {
      api.card.getCard(this.cardId).then((res) => {
        if (res.ok) {
          this.setCard(res.data)
        }
      })
    } else {
      this.setCard(null)
    }
  }

  card: Card | null = null
  addCard(card: SendedCard): void {
    api.card.createCard(card)
  }
  deleteCard(_id: string): void {
    api.card.deleteCard({ _id })
  }
  updateCard(updatedCard: UpdatedCard): void {
    api.card.updateCard(updatedCard)
  }

  setCard(card: Card | null): void {
    this.card = card
  }
  setCardById(id: string): void {
    this.cards.forEach((card) => {
      if (card._id === id) {
        this.setCard(card)
      }
    })
  }
}
