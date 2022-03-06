import { makeAutoObservable } from 'mobx'
import { Card, Cards, SendedCard, UpdatedCard } from '../api/api'
import { api } from '../api'
import cardConfig from './card-config.json'

interface CardSize {
  width: number
  height: number
}

export interface ICardsStore {
  defaultCardSize: CardSize

  cards: Cards

  cardId: string | null
  setCardId(id: string | null): void

  card: Card | null
  addCard(card: SendedCard): void
  deleteCard(_id: string): void
  updateCard(updatedCard: UpdatedCard): void
  requestForCard(): void
  setCard(card: Card | null): void
  setCardById(id: string): void
}

export class CardsStore implements ICardsStore {
  constructor() {
    makeAutoObservable(this)
  }

  defaultCardSize: CardSize = {
    width: cardConfig.width,
    height: cardConfig.height,
  }

  cards: Cards = []
  setCards(cards: Cards): void {
    this.cards = cards
  }
  pushCards(cards: Cards): void {
    this.setCards([...this.cards, ...cards])
  }

  cardId: string | null = null
  setCardId(id: string | null): void {
    this.cardId = id
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
  requestForCard(): void {
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
