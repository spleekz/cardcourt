import { Cards } from '../api/api'

export type ActionToUpdateCards = (cards: Cards) => void

export type Lang = 'ru' | 'en'
