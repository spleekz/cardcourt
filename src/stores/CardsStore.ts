import { nanoid } from 'nanoid'

interface IWordWithTranslate {
  ru: string
  en: string
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
        { en: 'fever', ru: 'лихорадка' },
        { en: 'love', ru: 'любовь' },
      ],
    },
    {
      name: 'dictation 1',
      author: 'spleekz',
      id: nanoid(),
      wordList: [
        { en: 'almonds', ru: 'миндаль' },
        { en: 'vibe', ru: 'вайб' },
        { en: 'aesthetics', ru: 'эстетика' },
        { en: 'appreciate', ru: 'ценить' },
      ],
    },
  ]
}
