import { makeAutoObservable } from 'mobx'

export interface IWithSet<T> {
  value: T
  set(value: T): void
}

export class WithSet<T> implements IWithSet<T> {
  value: T
  constructor(property: T) {
    makeAutoObservable(this, {}, { autoBind: true })
    this.value = property
  }

  set(value: T): void {
    this.value = value
  }
}
