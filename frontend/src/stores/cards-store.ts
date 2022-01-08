import { makeAutoObservable } from 'mobx'
import { nanoid } from 'nanoid'
import { IWithSet, WithSet } from './entities/with-set'
import { makePersistable } from 'mobx-persist-store'

export interface IWordWithTranslate {
  ru: string
  en: string
  id: string
}

export type WordListType = Array<IWordWithTranslate>

const headColors = ['#ffffff', '#ede4aa', 'pink'] as const

const wordListColors = ['#a4373a', '#9ee5ec', 'aqua'] as const

interface ICardUI {
  headColor: typeof headColors[number]
  wordListColor: typeof wordListColors[number]
}
export interface ICard {
  name: string
  author: string
  id: string
  wordList: WordListType
  ui: ICardUI
}
export interface ICardsStore {
  cards: Array<ICard>
  currentCardId: IWithSet<string | null>
  currentCard: ICard | null
  addCard(card: ICard): void
  deleteCard(id: string): void
  updateCard(id: string, card: ICard): void
}

export class CardsStore implements ICardsStore {
  constructor() {
    makeAutoObservable(this)
    // makePersistable(this, { name: 'CardsStore', properties: ['cards'], storage: window.localStorage })
  }
  cards: Array<ICard> = [
    {
      name: 'dictation 1',
      author: 'spleekz',
      id: '2',
      wordList: [
        { en: 'almonds', ru: 'миндаль', id: nanoid() },
        { en: 'vibe', ru: 'вайб', id: nanoid() },
        { en: 'aesthetics', ru: 'эстетика', id: nanoid() },
        { en: 'appreciate', ru: 'ценить', id: nanoid() },
      ],
      ui: {
        headColor: '#ede4aa',
        wordListColor: '#9ee5ec',
      },
    },
  ]
  currentCardId = new WithSet<string | null>(null)

  addCard(card: ICard): void {
    this.cards.push(card)
  }
  deleteCard(id: string): void {
    this.cards = this.cards.filter((card) => card.id !== id)
  }
  updateCard(id: string, editedCard: ICard): void {
    this.cards = this.cards.map((card) => {
      if (card.id === id) {
        return { ...card, ...editedCard }
      } else
        return {
          ...card,
        }
    })
  }

  get currentCard(): ICard | null {
    if (this.currentCardId) {
      let currentCard = null
      this.cards.forEach((card) => {
        if (card.id === this.currentCardId.value) {
          currentCard = card
        }
      })
      return currentCard
    } else {
      return null
    }
  }
}
