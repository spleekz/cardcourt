import { makeAutoObservable } from 'mobx'
import { Card, Cards, SendedCard, UpdatedCard } from '../api/api'
import { api } from '../api'
import { ICardsPaginationStore } from './cards-pagination-store'

interface LoadCardsOptions {
  page?: number
  pagesToLoad?: number
  pageSize?: number
  search?: string
}

export interface ICardsStore {
  pagination: ICardsPaginationStore

  cards: Cards
  setCards(cards: Cards): void
  pushCards(cards: Cards): void
  loadCards(options?: LoadCardsOptions): void
  loadMoreCards(options?: LoadCardsOptions): void

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
  loadCards({
    page = 1,
    pagesToLoad = 1,
    pageSize = this.pagination.pageSize,
    search = this.search,
  }: LoadCardsOptions = {}): void {
    api.cards.getCards({ page, pagesToLoad, pageSize, search }).then((res) => {
      if (res.ok) {
        if (page + pagesToLoad - 1 > this.pagination.maxLoadedPage) {
          this.pagination.setMaxLoadedPage(res.data.pagesLoaded)
        }
        this.pagination.setPageCount(res.data.pageCount)
        this.setCards(res.data.cards)
      }
    })
  }
  loadMoreCards({
    page = this.pagination.maxLoadedPage + 1,
    pagesToLoad = 1,
    pageSize = this.pagination.pageSize,
    search = this.search,
  }: LoadCardsOptions = {}): void {
    api.cards.getCards({ page, pagesToLoad, pageSize, search }).then((res) => {
      if (res.ok) {
        if (page + res.data.pagesLoaded - 1 > this.pagination.maxLoadedPage) {
          this.pagination.setMaxLoadedPage(page + res.data.pagesLoaded - 1)
        }
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
