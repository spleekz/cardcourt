import { makeAutoObservable } from 'mobx'

export class WithSet<T> {
  value: T
  constructor(property: T) {
    makeAutoObservable(this)
    this.value = property
  }
  set = (value: T): void => {
    this.value = value
  }
}
