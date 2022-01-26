import { makeAutoObservable } from 'mobx'

export type Page = 'main' | 'card' | 'new' | 'edit' | 'check' | 'auth'

export interface IAppStore {
  page: Page
  setPage(page: Page): void
}

export class AppStore implements IAppStore {
  constructor() {
    makeAutoObservable(this)
  }

  page: Page = 'main'
  setPage(page: Page): void {
    this.page = page
  }
}
