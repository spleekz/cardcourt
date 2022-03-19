import { makeAutoObservable } from 'mobx'
import { Cards, GetCardsParams, CardsResponse } from '../api/api'
import { FnToCallAfterRequest, getCards } from '../api'
import { ActionToUpdateCards } from './utility-types'

interface LoadCardsConfig {
  params: GetCardsParams
  actionToUpdateCards: ActionToUpdateCards
}

export interface SliderConfig {
  //Ссылка на карточки
  cards: Cards

  //Конфиги для загрузки карточек
  loadCardsConfig: LoadCardsConfig
  loadMoreCardsConfig: LoadCardsConfig

  //Визуальные параметры
  cardsToSlide: number
  cardsToShow: number
  cardWidth: number
  cardHeight: number
}

export interface ICardsSlider {
  cards: Cards

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

  pageWasVisited: boolean
  allPagesAreLoaded: boolean

  //Общий вид запроса за карточками
  getCardForSlider(config: LoadCardsConfig): Promise<CardsResponse>

  //Реализации запросов за карточками
  loadCards(config: LoadCardsConfig): Promise<CardsResponse>
  loadMoreCards(config: LoadCardsConfig): Promise<CardsResponse>

  reset(): void
  resetAndFillWithCards(): void
  slideRigth(): void
  slideLeft(): void
}

//! Стор
export class CardsSliderStore implements ICardsSlider {
  cards: Cards
  cardsToShow: number
  cardsToSlide: number
  cardWidth: number
  cardHeight: number

  loadCardsConfig: LoadCardsConfig
  loadMoreCardsConfig: LoadCardsConfig

  constructor(config: SliderConfig) {
    this.cards = config.cards

    this.loadCardsConfig = config.loadCardsConfig
    this.loadMoreCardsConfig = config.loadMoreCardsConfig

    this.cardsToSlide = config.cardsToSlide
    this.cardsToShow = config.cardsToShow
    this.cardWidth = config.cardWidth
    this.cardHeight = config.cardHeight

    makeAutoObservable(this, {}, { autoBind: true })
  }

  search = ''
  setSearch(value: string): void {
    this.search = value
    this.resetAndFillWithCards()
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

  get pageWasVisited(): boolean {
    return this.page <= this.maxVisitedPage
  }
  get allPagesAreLoaded(): boolean {
    return this.maxLoadedPage === this.pageCount
  }

  //!Функции слайдера
  getCardForSlider({ params, actionToUpdateCards }: LoadCardsConfig): Promise<CardsResponse> {
    const fnToCall: FnToCallAfterRequest = (data) => {
      actionToUpdateCards(data.cards)
      this.setMaxLoadedPage(data.maxLoadedPage)
      this.setPageCount(data.pageCount)
    }
    return getCards({ params, fnToCall })
  }

  loadCards({ params = {}, actionToUpdateCards }: LoadCardsConfig): Promise<CardsResponse> {
    const {
      page = 1,
      pagesToLoad = 1,
      pageSize = this.cardsToShow,
      search = this.search,
      by = '',
    } = params

    const loadCardsconfig = {
      params: { page, pagesToLoad, pageSize, search, by },
      actionToUpdateCards,
    }

    return this.getCardForSlider(loadCardsconfig)
  }

  loadMoreCards({ params = {}, actionToUpdateCards }: LoadCardsConfig): Promise<CardsResponse> {
    const {
      page = this.maxLoadedPage + 1,
      pagesToLoad = 2,
      pageSize = this.cardsToShow,
      search = this.search,
      by = '',
    } = params

    const loadMoreCardsConfig = {
      params: { page, pagesToLoad, pageSize, search, by },
      actionToUpdateCards,
    }

    return this.getCardForSlider(loadMoreCardsConfig)
  }

  reset(): void {
    this.sliderPosition = 0
    this.page = 1
    this.pageCount = 0
    this.maxLoadedPage = 0
    this.maxVisitedPage = 1
  }
  resetAndFillWithCards(): void {
    this.reset()
    this.loadCards(this.loadCardsConfig)
  }
  slideRigth(): void {
    this.setNextPage()
    if (!this.pageWasVisited) {
      this.updateMaxVisitedPage()
      if (!this.allPagesAreLoaded) {
        this.loadMoreCards(this.loadMoreCardsConfig)
      }
    }
    this.setSliderPositionForward()
  }
  slideLeft(): void {
    this.setPrevPage()
    this.setSliderPositionBack()
  }
}
