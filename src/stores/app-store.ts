import { makeAutoObservable } from 'mobx'
import { IWithSet, WithSet } from './entities/with-set'

export type Page = 'main' | 'card' | 'new' | 'edit' | 'check'

export interface IAppStore {
  page: IWithSet<Page>
}

export class AppStore implements IAppStore {
  constructor() {
    makeAutoObservable(this)
  }

  page: IWithSet<Page> = new WithSet('main')
}
