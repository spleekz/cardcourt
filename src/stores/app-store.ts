import { makeAutoObservable } from 'mobx'

export type Page = 'main' | 'card' | 'new' | 'edit' | 'check' | 'login' | 'registration' | 'user'

export class AppStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  page: Page = 'main'
  setPage(page: Page): void {
    this.page = page
  }
  get onAuthPage(): boolean {
    return this.page === 'login' || this.page === 'registration'
  }

  isAnyPopupOpened = false
  setIsAnyPopupOpened(value: boolean): void {
    this.isAnyPopupOpened = value
  }
}
