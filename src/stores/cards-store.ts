import { makeAutoObservable } from 'mobx'
import { Card, Cards, SendedCard, UpdatedCard } from '../api/api'
import { api } from '../api'

interface LoadCardsOptions {
  page?: number
  pagesToLoad?: number
  pageSize?: number
  search?: string
}

interface InfoAboutLoading {
  lastLoadedPage: number
}
interface InfoAboutFirstCardsLoading extends InfoAboutLoading {
  pageCount: number
}

export interface ICardsStore {
  cards: Cards
  setCards(cards: Cards): void
  pushCards(cards: Cards): void
  loadCards(options?: LoadCardsOptions): Promise<InfoAboutFirstCardsLoading>
  loadMoreCards(options?: LoadCardsOptions): Promise<InfoAboutLoading>

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
    pageSize = 5,
    search = '',
  }: LoadCardsOptions = {}): Promise<InfoAboutFirstCardsLoading> {
    return api.cards.getCards({ page, pagesToLoad, pageSize, search }).then((res) => {
      if (res.ok) {
        this.setCards(res.data.cards)
      }
      return {
        lastLoadedPage: page + res.data.pagesLoaded - 1 || 0,
        pageCount: res.data.pageCount,
      }
    })
  }
  loadMoreCards({
    page = 1,
    pagesToLoad = 1,
    pageSize = 5,
    search = '',
  }: LoadCardsOptions = {}): Promise<InfoAboutLoading> {
    return api.cards.getCards({ page, pagesToLoad, pageSize, search }).then((res) => {
      if (res.ok) {
        this.pushCards(res.data.cards)
      }
      return {
        lastLoadedPage: page + res.data.pagesLoaded - 1 || 0,
      }
    })
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
