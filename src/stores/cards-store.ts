import { makeAutoObservable } from 'mobx'
import { Card, Cards, SendedCard, UpdatedCard } from '../api/api'
import { api } from '../api'

export interface ICardsStore {
  cards: Cards
  setCards(cards: Cards): void
  pushCards(cards: Cards): void
  loadCards(search?: string, page?: number, pageSize?: number): void
  loadMoreCards(): void

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

  page: number
  setPage(page: number): void
  setNextPage(): void
  setPrevPage(): void

  pageCount: number
  setPageCount(pageCount: number): void
}

export class CardsStore implements ICardsStore {
  constructor() {
    makeAutoObservable(this)
  }

  cards: Cards = []
  setCards(cards: Cards): void {
    this.cards = cards
  }
  pushCards(cards: Cards): void {
    this.setCards([...this.cards, ...cards])
  }
  loadCards(search?: string, page?: number, pageSize?: number): void {
    api.cards.getCards({ search, page, pageSize }).then((res) => {
      if (res.ok) {
        this.setPageCount(res.data.pageCount)
        this.setCards(res.data.cards)
      }
    })
  }
  loadMoreCards(): void {
    this.setNextPage()
    api.cards.getCards({ search: this.search, page: this.page }).then((res) => {
      if (res.ok) {
        this.setPageCount(res.data.pageCount)
        this.pushCards(res.data.cards)
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

  page = 1
  setPage(page: number): void {
    this.page = page
  }
  setNextPage(): void {
    this.page++
  }
  setPrevPage(): void {
    this.page--
  }

  pageCount = 0
  setPageCount(pageCount: number): void {
    this.pageCount = pageCount
  }
}
