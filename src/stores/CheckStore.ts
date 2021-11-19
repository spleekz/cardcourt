import { makeAutoObservable } from 'mobx'
import { IWordWithTranslate, WordListType } from './CardsStore'
import { WithSet, IWithSet } from './entities/WithSet'
import { IWithBoolean, WithBoolean } from './entities/WithBoolean'

export type CheckLang = 'ru' | 'en'

export interface ICheckStore {
  wordList: IWithSet<WordListType>
  userInputLang: CheckLang
  timeLeft: number
  userInput: IWithSet<string>
  currentWordIndex: IWithSet<number>
  currentWord: IWordWithTranslate
  isCurrentWordCorrect: boolean
  checkMode: IWithBoolean
  startCheck: (wordList: WordListType) => void
}

export class CheckStore implements ICheckStore {
  constructor() {
    makeAutoObservable(this)
  }

  wordList = new WithSet<WordListType>([] as WordListType)
  checkMode = new WithBoolean(false)

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

  startCheck = (wordList: WordListType): void => {
    this.checkMode.set(true)
    this.wordList.set(wordList)
  }
}
