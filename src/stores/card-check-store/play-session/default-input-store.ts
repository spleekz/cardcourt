import { makeAutoObservable } from 'mobx'

export class DefaultInputStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  inputElement: HTMLInputElement | null
  setInputElement(element: HTMLInputElement | null): void {
    this.inputElement = element
    this.inputElement?.focus()
  }

  value = ''
  setValue(value: string): void {
    this.value = value
  }
  clearInput(): void {
    this.setValue('')
    this.inputElement?.focus()
  }

  isInputFocused = false
  setInputFocused(): void {
    this.isInputFocused = true
  }
  setInputUnfocused(): void {
    this.isInputFocused = false
  }
}
