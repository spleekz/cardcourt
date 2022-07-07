import { makeAutoObservable } from 'mobx'

export class DefaultInputStore {
  constructor() {
    this.focusInput()

    makeAutoObservable(this, {}, { autoBind: true })
  }

  value = ''
  setValue(value: string): void {
    this.value = value
  }
  clearInput(): void {
    this.setValue('')
    this.focusInput()
  }

  isInputFocused = false
  focusInput(): void {
    this.isInputFocused = true
  }
  unfocusInput(): void {
    this.isInputFocused = false
  }
}
