import shuffle from 'lodash.shuffle'
import { makeAutoObservable } from 'mobx'

import { Card, CardWord, CardWords } from 'api/api'

import { normalizeString } from 'utils/strings'

import { CardCheckSettingsStore } from './settings-store'

interface CardCheckPlaySessionConfig {
  card: Card
  settings: CardCheckSettingsStore
}

type SessionState = 'play' | 'result'

export class CardCheckPlaySessionStore {
  card: Card
  settings: CardCheckSettingsStore

  constructor({ card, settings }: CardCheckPlaySessionConfig) {
    this.card = card
    this.settings = settings

    this.setAndShuffleWords()

    makeAutoObservable(this, {}, { autoBind: true })
  }

  sessionState: SessionState = 'play'
  setSessionState(state: SessionState): void {
    this.sessionState = state
  }
  stopPlay(): void {
    this.setSessionState('result')
  }

  userInputValue = ''
  setUserInputValue(value: string): void {
    this.userInputValue = value
  }
  clearUserInputValue(): void {
    this.setUserInputValue('')
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

  currentWordIndex = 0
  goToNextWord(): void {
    if (this.currentWordIndex < this.words.length - 1) {
      this.currentWordIndex++
    } else {
      this.stopPlay()
    }
    this.clearUserInputValue()
  }
  skipCurrentWord(): void {
    this.setUserTranslateIsError()
  }
  setUserTranslateIsCorrect(): void {
    this.updateCorrectWords(this.currentWord)
    this.goToNextWord()
  }
  setUserTranslateIsError(): void {
    this.updateErrorWords(this.currentWord)
    this.goToNextWord()
  }
  checkUserTranslate(): void {
    const normalizedUserTranslate = normalizeString(this.userInputValue)
    const normalizedTranslateForShownWord = normalizeString(this.translateForShownWord)

    if (normalizedUserTranslate === normalizedTranslateForShownWord) {
      this.setUserTranslateIsCorrect()
    } else {
      this.setUserTranslateIsError()
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
    if (this.settings.langForShowing === 'en') {
      return this.currentWord.ru
    } else {
      return this.currentWord.en
    }
  }

  correctWords: CardWords = []
  updateCorrectWords(word: CardWord): void {
    this.correctWords.push(word)
  }

  errorWords: CardWords = []
  updateErrorWords(word: CardWord): void {
    this.errorWords.push(word)
  }

  get wordsCount(): number {
    return this.words.length
  }
  get correctWordsCount(): number {
    return this.correctWords.length
  }
  get errorWordsCount(): number {
    return this.errorWords.length
  }
}
