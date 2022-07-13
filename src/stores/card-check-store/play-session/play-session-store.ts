import shuffle from 'lodash.shuffle'
import { makeAutoObservable } from 'mobx'

import { Card, CardWord, CardWords } from 'api/api'

import { normalizeString, removeSkips } from 'utils/strings'

import { CardCheckSettingsStore } from '../settings-store'
import { CelledInputStore } from './celled-input-store'
import { DefaultInputStore } from './default-input-store'

type CardCheckPlaySessionConfig = {
  card: Card
  settings: CardCheckSettingsStore
}

type SessionState = 'play' | 'result'

type ResultWordStatus = 'correct' | 'error' | 'skipped'

type NotSkippedResultWord = {
  status: ResultWordStatus
  wordToBeTranslated: string
  correctTranslate: string
  userTranslate: string
  _id: string
}
type SkippedResultWord = Omit<NotSkippedResultWord, 'userTranslate'>
export type ResultWord = SkippedResultWord | NotSkippedResultWord
type ResultWords = Array<ResultWord>

export function isNotSkippedResultWord(resultWord: ResultWord): resultWord is NotSkippedResultWord {
  return (resultWord as NotSkippedResultWord).userTranslate !== undefined
}

export class CardCheckPlaySessionStore {
  card: Card
  private settings: CardCheckSettingsStore = new CardCheckSettingsStore()
  userInput: CelledInputStore | DefaultInputStore

  constructor({ card, settings }: CardCheckPlaySessionConfig) {
    this.card = card

    this.setAndShuffleWords()

    this.settings = settings

    this.userInput =
      this.settings.difficulty === 'easy'
        ? new CelledInputStore({
            initialValue: this.translateForShownWord,
          })
        : new DefaultInputStore()

    makeAutoObservable(this, {}, { autoBind: true })
  }

  sessionState: SessionState = 'play'
  setSessionState(state: SessionState): void {
    this.sessionState = state
  }
  stopPlayAndGoToResult(): void {
    this.setSessionState('result')
  }

  words: CardWords = []
  setWords(words: CardWords): void {
    this.words = words
  }
  shuffleWords(): void {
    this.words = shuffle(this.words)
  }
  setAndShuffleWords(): void {
    this.setWords(this.card.words)
    this.shuffleWords()
  }

  get isUserInputCelled(): boolean {
    return this.userInput instanceof CelledInputStore
  }
  get isUserInputDefault(): boolean {
    return this.userInput instanceof DefaultInputStore
  }

  get normalizedUserInputValue(): string {
    if (this.isUserInputCelled) {
      return normalizeString(removeSkips(this.userInput.value))
    }
    return normalizeString(this.userInput.value)
  }

  clearUserInputForNewValue(): void {
    if (this.userInput instanceof DefaultInputStore) {
      this.userInput.clearInput()
    } else if (this.userInput instanceof CelledInputStore) {
      this.userInput.setEmptyCells(this.translateForShownWord)
    }
  }
  unfocusUserInput(): void {
    this.userInput.unfocusInput()
  }

  currentWordIndex = 0

  goToNextWord(): void {
    this.currentWordIndex++
    this.clearUserInputForNewValue()
  }

  goNext(): void {
    if (this.currentWordIndex < this.words.length - 1) {
      this.goToNextWord()
    } else {
      this.stopPlayAndGoToResult()
    }
  }

  skipCurrentWord(): void {
    this.updateResultWords('skipped')
    this.goToNextWord()
  }

  checkUserTranslate(): boolean | undefined {
    const normalizedUserTranslate = this.normalizedUserInputValue
    const normalizedTranslateForShownWord = normalizeString(this.translateForShownWord)

    if (normalizedUserTranslate === '') {
      return
    }

    if (normalizedUserTranslate === normalizedTranslateForShownWord) {
      this.updateResultWords('correct')
      return true
    } else {
      this.updateResultWords('error')
      return false
    }
  }

  get currentWord(): CardWord {
    return this.words[this.currentWordIndex]
  }
  get shownWord(): string {
    if (this.settings.langForShowing === 'en') {
      return this.currentWord.en
    } else {
      return this.currentWord.ru
    }
  }
  get translateForShownWord(): string {
    return this.currentWord[this.settings.langForTyping]
  }

  resultWords: ResultWords = []
  updateResultWords(status: ResultWordStatus): void {
    const resultWordWithoutUserTranslate: ResultWord = {
      status,
      wordToBeTranslated: this.shownWord,
      correctTranslate: this.translateForShownWord,
      _id: this.currentWord._id,
    }

    if (status === 'skipped') {
      this.resultWords.push(resultWordWithoutUserTranslate)
    } else {
      this.resultWords.push({
        ...resultWordWithoutUserTranslate,
        userTranslate: this.userInput.value,
      })
    }
  }

  get correctWords(): ResultWords {
    return this.resultWords.filter((resultWord) => resultWord.status === 'correct')
  }
  get incorrectWords(): ResultWords {
    return this.resultWords.filter(
      (resultWord) => resultWord.status === 'error' || resultWord.status === 'skipped',
    )
  }
}
