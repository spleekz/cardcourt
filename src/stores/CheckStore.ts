import { makeAutoObservable } from 'mobx'
import { IWordWithTranslate, WordListType } from './CardsStore'
import { WithSet, IWithSet } from './entities/WithSet'

export type CheckLang = 'ru' | 'en'
export interface ICheckConfig {
  timeLeft: number
  userInputLang: CheckLang
}
export type CheckModeType = 'prepare' | 'play' | 'result'

export interface ICheckStore {
  wordList: IWithSet<WordListType>
  userInputLang: CheckLang
  timeLeft: number
  userInput: IWithSet<string>
  currentWordIndex: IWithSet<number>
  isCurrentWordBeforeLast: boolean
  currentWord: IWordWithTranslate
  isCurrentWordCorrect: boolean
  checkMode: IWithSet<CheckModeType>
  setConfig: (config: ICheckConfig) => void
}

export class CheckStore implements ICheckStore {
  constructor() {
    makeAutoObservable(this)
  }

  wordList = new WithSet<WordListType>([] as WordListType)
  checkMode = new WithSet<CheckModeType>('prepare')

  userInputLang: CheckLang = 'en'
  timeLeft = 60

  userInput = new WithSet<string>('')
  currentWordIndex = new WithSet<number>(0)

  get currentWord(): IWordWithTranslate {
    return this.wordList.value[this.currentWordIndex.value]
  }
  get isCurrentWordCorrect(): boolean {
    if (this.userInputLang === 'en') {
      return this.userInput.value === this.currentWord.en
    } else {
      return this.userInput.value === this.currentWord.ru
    }
  }
  get isCurrentWordBeforeLast(): boolean {
    return this.currentWordIndex.value < this.wordList.value.length - 1
  }

  setConfig = ({ timeLeft, userInputLang }: ICheckConfig): void => {
    this.timeLeft = timeLeft
    this.userInputLang = userInputLang
  }
}
