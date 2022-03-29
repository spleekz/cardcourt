import { makeAutoObservable } from 'mobx'
import { Cards, GetCardsParams, CardsResponse } from '../api/api'
import { FnToCallAfterRequest, getCards } from '../api'
import { WithBoolean } from './entities/with-boolean'
import { ActionToUpdateCards } from './utility-types'

interface LoadCardsConfig {
  params: GetCardsParams
  fnWithUpdatingCards: FnToCallAfterRequest
}
interface SliderLoadCardsConfig {
  params: GetCardsParams
  actionToUpdateCards: ActionToUpdateCards
}

export interface SliderConfig {
  //Ссылка на карточки
  cards: Cards

  //Конфиги для загрузки карточек
  loadCardsConfig: SliderLoadCardsConfig
  loadMoreCardsConfig: SliderLoadCardsConfig

  //Визуальные параметры
  cardsToSlide: number
  cardsToShow: number
  cardWidth: number
  cardHeight: number
}

export class CardSlider {
  cards: Cards

  cardsToShow: number
  cardsToSlide: number
  cardWidth: number
  cardHeight: number

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

  pageSize = 5
  setPageSize(size: number): void {
    this.pageSize = size
  }

  search = ''
  setSearchAndReset(value: string): void {
    this.search = value
    this.resetAndFillWithCards()
  }

  maxLoadedPage = 0
  setMaxLoadedPage(page: number): void {
    this.maxLoadedPage = page
  }

  //Дефолтные параметры запроса карточек
  get loadCardsDefaultParams(): GetCardsParams {
    return { page: 1, pagesToLoad: 2, pageSize: this.pageSize, search: this.search, by: '' }
  }

  get loadMoreCardsDefaultParams(): GetCardsParams {
    return {
      page: this.maxLoadedPage + 1,
      pagesToLoad: 2,
      pageSize: this.pageSize,
      search: this.search,
      by: '',
    }
  }

  loadCardsConfig: SliderLoadCardsConfig
  loadMoreCardsConfig: SliderLoadCardsConfig

  constructor(config: SliderConfig) {
    this.cards = config.cards

    this.loadCardsConfig = config.loadCardsConfig
    this.loadMoreCardsConfig = config.loadMoreCardsConfig

    this.cardsToSlide = config.cardsToSlide
    this.cardsToShow = config.cardsToShow
    this.cardWidth = config.cardWidth
    this.cardHeight = config.cardHeight

    this.maxLoadedPage = this.cards.length / this.cardsToShow

    makeAutoObservable(this, {}, { autoBind: true })
  }

  position = 0
  setPosition(position: number): void {
    this.position = position
  }
  setPositionForward(): void {
    this.position = this.position + this.pixelsToSlide
  }
  setPositionBack(): void {
    this.position = this.position - this.pixelsToSlide
  }
  get pixelsToSlide(): number {
    return this.cardsToSlide * (this.cardWidth + 16)
  }

  pageCount = 0
  setPageCount(pageCount: number): void {
    this.pageCount = pageCount
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
  getCardForSlider({ params, fnWithUpdatingCards }: LoadCardsConfig): Promise<CardsResponse> {
    const fnToCall: FnToCallAfterRequest = (data) => {
      fnWithUpdatingCards(data)
      this.setMaxLoadedPage(data.maxLoadedPage)
      this.setPageCount(data.pageCount)
    }
    return getCards({ params, fnToCall })
  }

  isLoading: WithBoolean = new WithBoolean(true)
  loadCards(): Promise<CardsResponse> {
    this.isLoading.set(true)

    const { params, actionToUpdateCards } = this.loadCardsConfig

    const fullParams = { ...this.loadCardsDefaultParams, ...params }

    const loadCardsСonfig: LoadCardsConfig = {
      params: fullParams,
      fnWithUpdatingCards: (data) => {
        this.isLoading.set(false)
        actionToUpdateCards(data.cards)
      },
    }

    return this.getCardForSlider(loadCardsСonfig)
  }

  loadMoreCards(): Promise<CardsResponse> {
    const { params, actionToUpdateCards } = this.loadMoreCardsConfig

    const fullParams = { ...this.loadMoreCardsDefaultParams, ...params }

    const loadMoreCardsConfig: LoadCardsConfig = {
      params: fullParams,
      fnWithUpdatingCards: (data) => actionToUpdateCards(data.cards),
    }

    return this.getCardForSlider(loadMoreCardsConfig)
  }

  reset(): void {
    this.position = 0
    this.page = 1
    this.pageCount = 0
    this.maxLoadedPage = 0
    this.maxVisitedPage = 1
  }
  resetAndFillWithCards(): void {
    this.reset()
    this.loadCards()
  }
  slideRigth(): void {
    this.setNextPage()
    if (!this.pageWasVisited) {
      this.updateMaxVisitedPage()
      if (!this.allPagesAreLoaded) {
        this.loadMoreCards()
      }
    }
    this.setPositionForward()
  }
  slideLeft(): void {
    this.setPrevPage()
    this.setPositionBack()
  }
}
