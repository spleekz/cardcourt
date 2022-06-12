import { makeAutoObservable } from 'mobx'

export class HardInputStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  value = ''
  setValue(value: string): void {
    this.value = value
  }
  clearInput(): void {
    this.setValue('')
  }
}
