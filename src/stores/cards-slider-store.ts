import { makeAutoObservable } from 'mobx'

export interface ICardsSliderStore {
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
}

export class CardsSliderStore implements ICardsSliderStore {
  constructor() {
    makeAutoObservable(this)
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
}
