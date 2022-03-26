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

//! Стор
export class CardsSliderStore {
  cards: Cards
  maxLoadedPage: number
  cardsToShow: number
  cardsToSlide: number
  cardWidth: number
  cardHeight: number

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

    if (!this.cards.length) {
      this.loadCards()
    }
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

    const loadCardsСonfig: LoadCardsConfig = {
      params,
      fnWithUpdatingCards: (data) => {
        this.isLoading.set(false)
        actionToUpdateCards(data.cards)
      },
    }

    return this.getCardForSlider(loadCardsСonfig)
  }

  loadMoreCards(): Promise<CardsResponse> {
    const { params, actionToUpdateCards } = this.loadMoreCardsConfig

    const loadMoreCardsConfig: LoadCardsConfig = {
      params,
      fnWithUpdatingCards: (data) => actionToUpdateCards(data.cards),
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
    this.setSliderPositionForward()
  }
  slideLeft(): void {
    this.setPrevPage()
    this.setSliderPositionBack()
  }
}
