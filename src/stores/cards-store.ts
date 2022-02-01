import { autorun, makeAutoObservable } from 'mobx'
import { Card, SendedCard, UpdatedCard } from '../api/api'
import { api } from '../api'

export interface ICardsStore {
  cards: Array<Card>
  loadCards(search: string): void

  search: string
  setSearch(value: string): void

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
    autorun(() => this.loadCards(this.search))
  }

  cards: Array<Card> = []
  loadCards(search: string): void {
    api.cards.getCards({ search }).then((res) => {
      if (res.ok) {
        this.cards = res.data
      }
    })
  }

  search = ''
  setSearch(value: string): void {
    this.search = value
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
