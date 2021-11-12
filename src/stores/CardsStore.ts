import { nanoid } from 'nanoid'

interface IWordWithTranslate {
  ru: string
  en: string
  id: string
}
export interface ICard {
  name: string
  author: string
  id: string
  wordList: Array<IWordWithTranslate>
}
export interface ICardsStore {
  cards: Array<ICard>
}

export class CardsStore implements ICardsStore {
  cards: Array<ICard> = [
    {
      name: 'Two first words',
      author: 'spleekz',
      id: nanoid(),
      wordList: [
        { en: 'fever', ru: 'лихорадка', id: nanoid() },
        { en: 'love', ru: 'любовь', id: nanoid() },
      ],
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
    },
  ]
}
