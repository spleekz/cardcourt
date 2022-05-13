import { makeAutoObservable } from 'mobx'
import { deleteCard, getCard, updateCard } from '../api'
import { Card, UpdatedCard } from '../api/api'
import { StatusCodes, UpdateCardResponsePromise } from '../api/api-utility-types'
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

  cardUpdatingState = new LoadingState({
    handledErrors: [StatusCodes.notFound, StatusCodes.notAuthorOfCard],
  })

  updateCard(card: UpdatedCard): UpdateCardResponsePromise {
    this.cardUpdatingState.setStatus('loading')

    return updateCard(card, {
      success: () => {
        this.cardUpdatingState.setCode(200)
        this.cardUpdatingState.setStatus('success')
      },
      error: (error) => {
        this.cardUpdatingState.setCode(error.status)
        this.cardUpdatingState.setStatus('error')
      },
    })
  }

  deleteCard(): void {
    deleteCard(this.card!._id)
  }
}
