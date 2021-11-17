import { makeAutoObservable } from 'mobx'
import { nanoid } from 'nanoid'

interface IWordWithTranslate {
  ru: string
  en: string
  id: string
}
const headColors = ['#ffffff', '#ede4aa'] as const
const wordListColors = ['#a4373a', '#9ee5ec'] as const
interface ICardUi {
  headColor: typeof headColors[number]
  wordListColor: typeof wordListColors[number]
}
export interface ICard {
  name: string
  author: string
  id: string
  wordList: Array<IWordWithTranslate>
  ui: ICardUi
}

export class CardsStore {
  constructor() {
    makeAutoObservable(this)
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
  currentCardId: string | null = null
  get currentCard(): ICard | null {
    if (this.currentCardId) {
      let currentCard = null
      this.cards.forEach((card) => {
        if (card.id === this.currentCardId) {
          currentCard = card
        }
      })
      return currentCard
    } else {
      return null
    }
  }
  setCurrentCardId = (cardId: string): void => {
    this.currentCardId = cardId
  }
}
export type ICardsStore = InstanceType<typeof CardsStore>
