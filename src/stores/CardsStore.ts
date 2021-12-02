import { makeAutoObservable } from 'mobx'
import { nanoid } from 'nanoid'
import { IWithSet, WithSet } from './entities/WithSet'
import { makePersistable } from 'mobx-persist-store'

export interface IWordWithTranslate {
  ru: string
  en: string
  id: string
}
export type WordListType = Array<IWordWithTranslate>
const headColors = ['#ffffff', '#ede4aa', 'pink'] as const
const wordListColors = ['#a4373a', '#9ee5ec', 'aqua'] as const
interface ICardUi {
  headColor: typeof headColors[number]
  wordListColor: typeof wordListColors[number]
}
export interface ICard {
  name: string
  author: string
  id: string
  wordList: WordListType
  ui: ICardUi
}
export interface ICardsStore {
  cards: Array<ICard>
  currentCardId: IWithSet<string | null>
  currentCard: ICard | null
}

export class CardsStore implements ICardsStore {
  constructor() {
    makeAutoObservable(this)
    makePersistable(this, { name: 'CardsStore', properties: ['cards'], storage: window.localStorage })
  }
  cards: Array<ICard> = [
    {
      name: 'Two first words',
      author: 'spleekz',
      id: '1',
      wordList: [
        { en: 'fever', ru: 'лихорадка', id: nanoid() },
        { en: 'love', ru: 'любовь', id: nanoid() },
      ],
      ui: {
        headColor: '#ffffff',
        wordListColor: '#a4373a',
      },
    },
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
