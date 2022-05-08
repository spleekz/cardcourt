import { makeAutoObservable } from 'mobx'
import { deleteCard, getCard } from '../api'
import { Card } from '../api/api'
import { StatusCodes } from '../api/api-utility-types'
import { LoadingState } from './entities/loading-state'

export class CurrentCardStore {
  constructor(cardId: string) {
    makeAutoObservable(this, {}, { autoBind: true })

    this.loadCard(cardId)
  }

  card: Card | null
  setCard(card: Card | null): void {
    this.card = card
  }

  cardLoadingState = new LoadingState({
    initialStatus: 'loading',
    handledErrors: [StatusCodes.notFound],
  })

  loadCard(id: string): void {
    this.cardLoadingState.setStatus('loading')

    getCard(id, {
      success: (data) => {
        this.setCard(data)
        this.cardLoadingState.setStatus('success')
        this.cardLoadingState.setCode(StatusCodes.ok)
      },
      error: (error) => {
        this.cardLoadingState.setCode(error.status)
        this.cardLoadingState.setStatus('error')
      },
    })
  }

  deleteCard(): void {
    deleteCard(this.card!._id)
  }
}
