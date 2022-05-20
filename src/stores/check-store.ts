import { makeAutoObservable } from 'mobx'

import { CardWord, CardWords } from 'api/api'

export type Lang = 'ru' | 'en'

export interface ICheckConfig {
  userInputLang: Lang
}

export type CheckModeType = 'prepare' | 'play' | 'result'

export class CheckStore {
  constructor() {
    makeAutoObservable(this)
  }

  wordList: CardWords = []
  setWordList(wordList: CardWords): void {
    this.wordList = wordList
  }

  checkMode: CheckModeType = 'prepare'
  setCheckMode(mode: CheckModeType): void {
    this.checkMode = mode
  }

  userInput = ''
  setUserInput(value: string): void {
    this.userInput = value
  }

  currentWordIndex = 0
  setCurrentWordIndex(index: number): void {
    this.currentWordIndex = index
  }
  updateCurrentWordIndex(): void {
    this.currentWordIndex++
  }

  userInputLang: Lang = 'en'
  get currentWord(): CardWord {
    return this.wordList[this.currentWordIndex]
  }
  get isCurrentWordCorrect(): boolean {
    if (this.userInputLang === 'en') {
      return this.userInput === this.currentWord.en
    } else {
      return this.userInput === this.currentWord.ru
    }
  }
  get isCurrentWordLast(): boolean {
    return this.currentWordIndex === this.wordList.length - 1
  }
  setConfig({ userInputLang }: ICheckConfig): void {
    this.userInputLang = userInputLang
  }
}
