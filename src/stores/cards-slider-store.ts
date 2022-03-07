import { makeAutoObservable } from 'mobx'
import { Cards } from '../api/api'
import { ICardsStore } from './cards-store'
import { api } from '../api'

interface LoadCardsOptions {
  page?: number
  pagesToLoad?: number
  pageSize?: number
  search?: string
  by?: string
}

interface InfoAboutLoading {
  lastLoadedPage: number
}
export interface InfoAboutFirstCardsLoading extends InfoAboutLoading {
  pageCount: number
  cards: Cards
}

export interface SliderConfig {
  cardsToSlide: number
  cardsToShow: number
  cardWidth: number
  cardHeight: number

  loadCardsConfig: LoadCardsOptions
  loadMoreCardsConfig: LoadCardsOptions
}

export interface ICardsSlider {
  cardsStore: ICardsStore

  cards: Cards
  setCards(cards: Cards): void
  pushCards(cards: Cards): void

  search: string
  setSearch(value: string): void

  sliderPosition: number
  setSliderPosition(position: number): void
  setSliderPositionForward(): void
  setSliderPositionBack(): void
  pixelsToSlide: number

  cardsToShow: number
  cardsToSlide: number
  cardWidth: number
  cardHeight: number

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

  maxVisitedPage: number
  updateMaxVisitedPage(): void
  checkIfMaxVisitedPage(): void

  pageWasVisited: boolean
  allPagesAreLoaded: boolean

  loadCardsConfig: LoadCardsOptions
  loadCards(options: LoadCardsOptions): Promise<InfoAboutFirstCardsLoading>
  loadMoreCards(options: LoadCardsOptions): Promise<InfoAboutLoading>
  reset(): void
  initializeSlider(): void
  slideRigth(): void
  slideLeft(): void
}

export class CardsSliderStore implements ICardsSlider {
  cardsStore: ICardsStore

  cardsToShow: number
  cardsToSlide: number
  cardWidth: number
  cardHeight: number

  loadCardsConfig: LoadCardsOptions
  loadMoreCardsConfig: LoadCardsOptions

  constructor(cardsStore: ICardsStore, config: SliderConfig) {
    this.cardsStore = cardsStore

    this.cardsToSlide = config.cardsToSlide
    this.cardsToShow = config.cardsToShow
    this.cardWidth = config.cardWidth
    this.cardHeight = config.cardHeight

    this.loadCardsConfig = config.loadCardsConfig
    this.loadMoreCardsConfig = config.loadMoreCardsConfig

    makeAutoObservable(this, {}, { autoBind: true })
  }

  cards: Cards = []
  setCards(cards: Cards): void {
    this.cards = cards
  }
  pushCards(cards: Cards): void {
    this.cards = [...this.cards, ...cards]
  }

  search = ''
  setSearch(value: string): void {
    this.search = value
  }

  sliderPosition = 0
  setSliderPosition(position: number): void {
    this.sliderPosition = position
  }
  setSliderPositionForward(): void {
    this.sliderPosition = this.sliderPosition + this.pixelsToSlide
  }
  setSliderPositionBack(): void {
    this.sliderPosition = this.sliderPosition - this.pixelsToSlide
  }
  get pixelsToSlide(): number {
    return this.cardsToSlide * (this.cardWidth + 16)
  }

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

  maxVisitedPage = 1
  updateMaxVisitedPage(): void {
    this.maxVisitedPage++
  }
  checkIfMaxVisitedPage(): void {
    if (this.page > this.maxVisitedPage) {
      this.updateMaxVisitedPage()
    }
  }

  get pageWasVisited(): boolean {
    return this.page <= this.maxVisitedPage
  }
  get allPagesAreLoaded(): boolean {
    return this.maxLoadedPage === this.pageCount
  }

  loadCards({
    page = 1,
    pagesToLoad = 1,
    pageSize = this.cardsToShow,
    search = this.search,
    by = '',
  }: LoadCardsOptions = {}): Promise<InfoAboutFirstCardsLoading> {
    return api.cards.getCards({ page, pagesToLoad, pageSize, search, by }).then((res) => {
      if (res.ok) {
        this.setCards(res.data.cards)
      }
      return {
        lastLoadedPage: page + res.data.pagesLoaded - 1 || 0,
        pageCount: res.data.pageCount,
        cards: this.cards,
      }
    })
  }
  loadMoreCards({
    page = this.maxLoadedPage + 1,
    pagesToLoad = 2,
    pageSize = this.cardsToShow,
    search = this.search,
    by = '',
  }: LoadCardsOptions = {}): Promise<InfoAboutLoading> {
    return api.cards.getCards({ page, pagesToLoad, pageSize, search, by }).then((res) => {
      if (res.ok) {
        this.pushCards(res.data.cards)
      }
      return {
        lastLoadedPage: page + res.data.pagesLoaded - 1 || 0,
      }
    })
  }
  reset(): void {
    this.sliderPosition = 0
    this.page = 1
    this.pageCount = 0
    this.maxLoadedPage = 0
    this.maxVisitedPage = 1
  }
  initializeSlider(): void {
    this.reset()
    this.loadCards(this.loadCardsConfig).then(({ lastLoadedPage, pageCount, cards }) => {
      this.setCards(cards)
      this.setMaxLoadedPage(lastLoadedPage)
      this.setPageCount(pageCount)
    })
  }
  slideRigth(): void {
    this.setNextPage()
    if (!this.pageWasVisited) {
      this.updateMaxVisitedPage()
      if (!this.allPagesAreLoaded) {
        this.loadMoreCards(this.loadMoreCardsConfig).then(({ lastLoadedPage }) => {
          this.setMaxLoadedPage(lastLoadedPage)
        })
      }
    }
    this.setSliderPositionForward()
  }
  slideLeft(): void {
    this.setPrevPage()
    this.setSliderPositionBack()
  }
}
