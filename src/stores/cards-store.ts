import { makeAutoObservable } from 'mobx'
import { Card, SendedCard, UpdatedCard } from '../api/api'
import { IWithSet, WithSet } from './entities/with-set'
import { api } from '../api'

export interface ICardsStore {
  cards: Array<Card>
  cardId: IWithSet<string | null>
  card: Card | null
  addCard(card: SendedCard): void
  deleteCard(_id: string): void
  updateCard(updatedCard: UpdatedCard): void
  requestForCard(): void
  setCardById(id: string): void
  setCard(card: Card | null): void
  loadCards(): void
}

export class CardsStore implements ICardsStore {
  constructor() {
    makeAutoObservable(this)
  }
  cards: Array<Card> = []

  cardId: IWithSet<string | null> = new WithSet<string | null>(null)

  addCard(card: SendedCard): void {
    api.card.createCard(card)
  }
  deleteCard(_id: string): void {
    api.card.deleteCard({ _id })
  }
  updateCard(updatedCard: UpdatedCard): void {
    api.card.updateCard(updatedCard)
  }
  loadCards(): void {
    api.cards.getCards().then((res) => {
      if (res.ok) {
        this.cards = res.data
      }
    })
  }

  card: Card | null = null

  requestForCard(): void {
    if (this.cardId.value) {
      api.card.getCard(this.cardId.value).then((res) => {
        if (res.ok) {
          this.setCard(res.data)
        }
      })
    } else {
      this.setCard(null)
    }
  }
  setCardById(id: string): void {
    this.cards.forEach((card) => {
      if (card._id === id) {
        this.setCard(card)
      }
    })
  }

  setCard(card: Card | null): void {
    this.card = card
  }
}
