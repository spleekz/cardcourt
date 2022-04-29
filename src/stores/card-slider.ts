import { makeAutoObservable } from 'mobx'
import { Cards, GetCardsParams } from '../api/api'
import { getCardCount, getCards } from '../api'
import { ActionToUpdateCards } from './stores-utility-types'
import { Rename, RequiredBy } from '../basic-utility-types'
import { CardsResponsePromise, FnToCallAfterRequest, GetCardsConfig } from '../api/api-utility-types'

type LoadCardsConfig = RequiredBy<
  Rename<GetCardsConfig, 'successFn', 'fnWithUpdatingCards'>,
  'fnWithUpdatingCards'
>

interface SliderLoadCardsConfig {
  pagesToLoad: number
  actionToUpdateCards: ActionToUpdateCards
}

interface ParamsForCardRequest {
  search: string
  by: string
}

export interface SliderConfig {
  //Ссылка на карточки
  cards: Cards

  //Конфиги для загрузки карточек
  initialParamsForCardRequest: ParamsForCardRequest

  loadCardsConfig: SliderLoadCardsConfig
  loadMoreCardsConfig: SliderLoadCardsConfig

  //Визуальные параметры
  cardsToSlide: number
  cardsToShow: number
  cardWidth: number
  cardHeight: number
}

export class CardSlider {
  cards: Cards = []

  cardsToShow: number
  cardsToSlide: number
  cardWidth: number
  cardHeight: number

  page = 1
  private setPage(page: number): void {
    this.page = page
  }
  private setNextPage(): void {
    this.page++
  }
  private setPrevPage(): void {
    this.page--
  }

  private setSearch(search: string): void {
    this.actualForCardRequest.search = search
  }
  setSearchAndReset(value: string | null): void {
    const search = value || this.initialSearch
    this.setSearch(search)
    this.resetAndFillWithCards()
  }

  //Страница, с которой будет начинаться запрос loadMoreCards
  private maxLoadedPage = 0
  private setMaxLoadedPage(page: number): void {
    this.maxLoadedPage = page
  }

  //Дефолтные параметры запросов
  private get loadCardsDefaultParams(): GetCardsParams {
    return {
      page: 1,
      pagesToLoad: 2,
      pageSize: this.cardsToShow,
      search: this.search,
      by: this.by,
    }
  }
  private get loadMoreCardsDefaultParams(): GetCardsParams {
    return {
      page: this.maxLoadedPage + 1,
      pagesToLoad: 2,
      pageSize: this.cardsToShow,
      search: this.search,
      by: this.by,
    }
  }

  //Пользовательские конфиги для запросов
  initialParamsForCardRequest: ParamsForCardRequest
  actualForCardRequest: ParamsForCardRequest

  get initialSearch(): string {
    return this.initialParamsForCardRequest.search
  }
  get initialBy(): string {
    return this.initialParamsForCardRequest.by
  }

  get search(): string {
    return this.actualForCardRequest.search
  }
  get by(): string {
    return this.actualForCardRequest.by
  }

  private loadCardsConfig: SliderLoadCardsConfig
  private loadMoreCardsConfig: SliderLoadCardsConfig

  constructor(config: SliderConfig) {
    this.actualForCardRequest = this.initialParamsForCardRequest = config.initialParamsForCardRequest

    this.loadCardsConfig = config.loadCardsConfig
    this.loadMoreCardsConfig = config.loadMoreCardsConfig

    this.cardsToSlide = config.cardsToSlide
    this.cardsToShow = config.cardsToShow
    this.cardWidth = config.cardWidth
    this.cardHeight = config.cardHeight

    this.cards = config.cards

    const configCardCount = config.cards.length
    //!Догружаем карточки до полной страницы, если возможно
    if (configCardCount !== 0) {
      //Запрос за количеством карточек по этому запросу, чтобы узнать, все ли карточки есть в конфиге
      getCardCount({ pageSize: this.cardsToShow, search: this.search, by: this.by }).then((res) => {
        const { pageCount, cardCount } = res

        this.pageCount = pageCount

        //Если в конфиге нецелое число страниц и ещё есть карточки по этому запросу
        if (configCardCount % this.cardsToShow !== 0 && cardCount > configCardCount) {
          const loadCardsToFullPageParams: GetCardsParams = {
            page: configCardCount + 1,
            pagesToLoad: this.cardsToShow - (configCardCount % this.cardsToShow),
            pageSize: 1,
          }
          const successFn: FnToCallAfterRequest = (data) => {
            this.loadMoreCardsConfig.actionToUpdateCards(data.cards)
            this.maxLoadedPage = this.cards.length / this.cardsToShow
          }
          //Догружаем карточки в хранилище
          getCards({
            params: loadCardsToFullPageParams,
            successFn,
          })
        } else {
          //Если в конфиге целое число страниц
          this.maxLoadedPage = this.cards.length / this.cardsToShow
        }
      })
    } else {
      //Если карточек в конфиге нет
      this.pageCount = 0
      this.maxLoadedPage = 0
    }

    makeAutoObservable(this, {}, { autoBind: true })
  }

  position = 0
  setPosition(position: number): void {
    this.position = position
  }
  private setPositionForward(): void {
    this.position = this.position + this.pixelsToSlide
  }
  private setPositionBack(): void {
    this.position = this.position - this.pixelsToSlide
  }
  private get pixelsToSlide(): number {
    return this.cardsToSlide * (this.cardWidth + 16)
  }

  pageCount = 0
  private setPageCount(pageCount: number): void {
    this.pageCount = pageCount
  }

  private maxVisitedPage = 1
  private updateMaxVisitedPage(): void {
    this.maxVisitedPage++
  }

  private get pageWasVisited(): boolean {
    return this.page <= this.maxVisitedPage
  }
  get allPagesAreLoaded(): boolean {
    return this.maxLoadedPage === this.pageCount
  }
  get onLastPage(): boolean {
    return this.page === this.pageCount
  }

  //Общий вид запроса карточек для слайдера
  private getCardForSlider({
    params,
    fnWithUpdatingCards,
    errors,
    anywayFn,
  }: LoadCardsConfig): CardsResponsePromise {
    const successFn: FnToCallAfterRequest = (data) => {
      fnWithUpdatingCards(data)
      if (data.maxLoadedPage > this.maxLoadedPage) {
        this.setMaxLoadedPage(data.maxLoadedPage)
      }
    }
    return getCards({ params, successFn, errors, anywayFn })
  }

  areCardsLoading = true
  setAreCardsLoading(value: boolean): void {
    this.areCardsLoading = value
  }

  get areCardsFinded(): boolean {
    return this.cards.length !== 0
  }
  loadCards(): CardsResponsePromise {
    this.setAreCardsLoading(true)

    const { pagesToLoad, actionToUpdateCards } = this.loadCardsConfig
    //Ставим дефолтные параметры вместо тех, которые пользователь не указывает
    const fullParams = { ...this.loadCardsDefaultParams, pagesToLoad }

    const anywayFn = (): void => this.setAreCardsLoading(false)

    const loadCardsСonfig: LoadCardsConfig = {
      params: fullParams,
      fnWithUpdatingCards: (data) => {
        actionToUpdateCards(data.cards)
        this.setAreCardsLoading(false)
        this.setPageCount(data.pageCount)
      },
      anywayFn,
    }

    return this.getCardForSlider(loadCardsСonfig)
  }

  loadMoreCards(): CardsResponsePromise {
    const { pagesToLoad, actionToUpdateCards } = this.loadMoreCardsConfig
    //Ставим дефолтные параметры вместо тех, которые пользователь не указывает
    const fullParams = { ...this.loadMoreCardsDefaultParams, pagesToLoad }

    const loadMoreCardsConfig: LoadCardsConfig = {
      params: fullParams,
      fnWithUpdatingCards: (data) => actionToUpdateCards(data.cards),
    }

    return this.getCardForSlider(loadMoreCardsConfig)
  }

  private reset(): void {
    this.position = 0
    this.page = 1
    this.pageCount = 0
    this.maxLoadedPage = 0
    this.maxVisitedPage = 1
  }
  private resetAndFillWithCards(): void {
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
