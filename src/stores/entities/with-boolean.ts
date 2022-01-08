import { makeAutoObservable } from 'mobx'

export interface IWithBoolean {
  value: boolean
  set(value: boolean): void
  toggle(): void
}

export class WithBoolean implements IWithBoolean {
  value: boolean
  constructor(value: boolean) {
    makeAutoObservable(this)
    this.value = value
  }

  set(value: boolean): void {
    this.value = value
  }
  toggle(): void {
    this.value = !this.value
  }
}
