import { makeAutoObservable } from 'mobx'
import { Card, Cards, SendedCard, UpdatedCard } from '../api/api'
import { api } from '../api'

export interface ICardsStore {
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

  // pagination

  pageSize: number
  setPageSize(size: number): void

  page: number
  setPage(page: number): void
  setNextPage(): void
  setPrevPage(): void

  pageCount: number
  setPageCount(pageCount: number): void

  maxLoadedPage: number
  setMaxLoadedPage(page: number): void

  notLastPage: boolean
  pageWasVisited: boolean
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
  loadCards(page = 1, pagesToLoad = 1, pageSize = this.pageSize, search = this.search): void {
    api.cards.getCards({ page, pagesToLoad, pageSize, search }).then((res) => {
      if (res.ok) {
        this.setMaxLoadedPage(pagesToLoad)
        this.setPageCount(res.data.pageCount)
        this.setCards(res.data.cards)
      }
    })
  }
  loadMoreCards(
    page = this.page + 1,
    pagesToLoad = 1,
    pageSize = this.pageSize,
    search = this.search
  ): void {
    api.cards.getCards({ page, pagesToLoad, pageSize, search }).then((res) => {
      if (res.ok) {
        this.setMaxLoadedPage(page)
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

  //!PAGINATION

  pageSize = 5
  setPageSize(size: number): void {
    this.pageSize = size
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

  maxLoadedPage = 0
  setMaxLoadedPage(page: number): void {
    this.maxLoadedPage = page
  }

  get notLastPage(): boolean {
    return this.page < this.pageCount
  }
  get pageWasVisited(): boolean {
    return this.page < this.maxLoadedPage
  }
}
