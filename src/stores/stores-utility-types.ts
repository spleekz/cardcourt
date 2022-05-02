import { Cards } from '../api/api'

export type ActionToUpdateCards = (cards: Cards) => void

export type LoadingStatus = 'error' | 'loading' | 'success'

export interface LoadingState {
  status: LoadingStatus
  handledErrors: Array<number>
  code: number | null
}
