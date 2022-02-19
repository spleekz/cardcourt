import { makeAutoObservable } from 'mobx'
import { ICardsStore } from './cards-store'

export interface ICardsSliderStore {
  cardsStore: ICardsStore

  reset(): void

  search: string
  setSearch(value: string): void

  sliderPosition: number
  setSliderPosition(position: number): void
  setSliderPositionForward(): void
  setSliderPositionBack(): void

  pixelsToSlide: number
  setPixelsToSlide(value: number): void

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

  initializeSlider(): void
  slideRigth(): void
  slideLeft(): void
}

export class CardsSliderStore implements ICardsSliderStore {
  cardsStore: ICardsStore

  constructor(cardsStore: ICardsStore) {
    this.cardsStore = cardsStore
    makeAutoObservable(this, {}, { autoBind: true })
  }

  reset(): void {
    this.sliderPosition = 0
    this.page = 1
    this.pageCount = 0
    this.maxLoadedPage = 0
    this.maxVisitedPage = 1
  }

  search = ''
  setSearch(value: string): void {
    this.search = value
  }

  pixelsToSlide = 1680
  setPixelsToSlide(value: number): void {
    this.pixelsToSlide = value
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

  initializeSlider(): void {
    this.reset()
    this.cardsStore
      .loadCards({ page: 1, pagesToLoad: 3, pageSize: this.pageSize, search: this.search })
      .then(({ lastLoadedPage, pageCount }) => {
        this.setMaxLoadedPage(lastLoadedPage)
        this.setPageCount(pageCount)
      })
  }
  slideRigth(): void {
    this.setNextPage()
    if (!this.pageWasVisited) {
      this.updateMaxVisitedPage()
      if (!this.allPagesAreLoaded) {
        this.cardsStore
          .loadMoreCards({
            page: this.maxLoadedPage + 1,
            pagesToLoad: 2,
            pageSize: this.pageSize,
            search: this.search,
          })
          .then(({ lastLoadedPage }) => {
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
