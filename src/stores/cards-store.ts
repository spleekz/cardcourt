import { makeAutoObservable } from 'mobx'
import { Card, Cards, SendedCard, UpdatedCard } from '../api/api'
import { api } from '../api'
import { ICardsPaginationStore } from './cards-pagination-store'

export interface ICardsStore {
  pagination: ICardsPaginationStore

  cards: Cards
  setCards(cards: Cards): void
  pushCards(cards: Cards): void
  loadCards(page?: number, pagesToLoad?: number, pageSize?: number, search?: string): void
  loadMoreCards(page?: number, pagesToLoad?: number, pageSize?: number, search?: string): void

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
  pagination: ICardsPaginationStore

  constructor(cardsPaginationStore: ICardsPaginationStore) {
    makeAutoObservable(this)
    this.pagination = cardsPaginationStore
  }

  cards: Cards = []
  setCards(cards: Cards): void {
    this.cards = cards
  }
  pushCards(cards: Cards): void {
    this.setCards([...this.cards, ...cards])
  }
  loadCards(
    page = 1,
    pagesToLoad = 1,
    pageSize = this.pagination.pageSize,
    search = this.search
  ): void {
    api.cards.getCards({ page, pagesToLoad, pageSize, search }).then((res) => {
      if (res.ok) {
        this.pagination.setMaxLoadedPage(pagesToLoad)
        this.pagination.setPageCount(res.data.pageCount)
        this.setCards(res.data.cards)
      }
    })
  }
  loadMoreCards(
    page = this.pagination.page + 1,
    pagesToLoad = 1,
    pageSize = this.pagination.pageSize,
    search = this.search
  ): void {
    api.cards.getCards({ page, pagesToLoad, pageSize, search }).then((res) => {
      if (res.ok) {
        this.pagination.setMaxLoadedPage(page)
        this.pagination.setPageCount(res.data.pageCount)
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
}
