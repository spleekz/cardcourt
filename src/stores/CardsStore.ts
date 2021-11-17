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
export interface ICardsStore {
  cards: Array<ICard>
}

export class CardsStore implements ICardsStore {
  constructor() {
    makeAutoObservable(this)
  }
  cards: Array<ICard> = [
    {
      name: 'Two first words',
      author: 'spleekz',
      id: nanoid(),
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
      id: nanoid(),
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
}
