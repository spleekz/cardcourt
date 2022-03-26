import { makeAutoObservable } from 'mobx'

export type Page = 'main' | 'card' | 'new' | 'edit' | 'check' | 'auth' | 'user'

export class AppStore {
  constructor() {
    makeAutoObservable(this)
  }

  page: Page = 'main'
  setPage(page: Page): void {
    this.page = page
  }
}
