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

  get card(): Card | null {
    if (this.cardId) {
      let currentCard = null
      this.cards.forEach((card) => {
        if (card._id === this.cardId.value) {
          currentCard = card
        }
      })
      return currentCard
    } else {
      return null
    }
  }
}
