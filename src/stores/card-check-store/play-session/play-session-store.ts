import shuffle from 'lodash.shuffle'
import { makeAutoObservable } from 'mobx'

import { Card, CardWord, CardWords } from 'api/api'

import { normalizeString, removeSkips } from 'utils/strings'

import { CardCheckSettingsStore } from '../settings-store'
import { EasyInputStore } from './easy-input-store'
import { HardInputStore } from './hard-input-store'

interface CardCheckPlaySessionConfig {
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
  userInput: EasyInputStore | HardInputStore

  constructor({ card, settings }: CardCheckPlaySessionConfig) {
    this.card = card

    this.setAndShuffleWords()

    this.settings = settings

    this.userInput =
      this.settings.difficulty === 'easy'
        ? new EasyInputStore({
            initialValue: this.translateForShownWord,
          })
        : new HardInputStore()

    makeAutoObservable(this, {}, { autoBind: true })
  }

  sessionState: SessionState = 'play'
  setSessionState(state: SessionState): void {
    this.sessionState = state
  }
  stopPlay(): void {
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

  clearUserInput(): void {
    if (this.userInput instanceof HardInputStore) {
      this.userInput.clearInput()
    } else if (this.userInput instanceof EasyInputStore) {
      this.userInput.clearInput({ newValue: this.translateForShownWord })
    }
  }

  currentWordIndex = 0
  goToNextWord(): void {
    if (this.currentWordIndex < this.words.length - 1) {
      this.currentWordIndex++
    } else {
      this.stopPlay()
    }
    this.clearUserInput()
  }
  skipCurrentWord(): void {
    this.updateResultWords('skipped')
    this.goToNextWord()
  }
  checkUserTranslate(): void {
    const normalizedUserTranslate = normalizeString(removeSkips(this.userInput.value))
    const normalizedTranslateForShownWord = normalizeString(this.translateForShownWord)

    if (normalizedUserTranslate === '') {
      return
    }

    if (normalizedUserTranslate === normalizedTranslateForShownWord) {
      this.updateResultWords('correct')
    } else {
      this.updateResultWords('error')
    }

    this.goToNextWord()
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
