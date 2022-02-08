import { makeAutoObservable } from 'mobx'

export interface ICardsPaginationStore {
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

export class CardsPaginationStore implements ICardsPaginationStore {
  constructor() {
    makeAutoObservable(this)
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

  get notLastPage(): boolean {
    return this.page < this.pageCount
  }
  get pageWasVisited(): boolean {
    return this.page < this.maxLoadedPage
  }
}
