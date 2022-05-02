import { makeAutoObservable } from 'mobx'
import { deleteCard, getCard } from '../api'
import { Card } from '../api/api'
import { isUnknownError } from '../utils/errors'
import { LoadingState, LoadingStatus } from './stores-utility-types'

export class CurrentCardStore {
  constructor(cardId: string) {
    makeAutoObservable(this, {}, { autoBind: true })

    this.loadCard(cardId)
  }

  card: Card | null
  setCard(card: Card | null): void {
    this.card = card
  }

  private loadingState: LoadingState = {
    status: 'loading',
    handledErrors: [404],
    code: null,
  }

  get loadingStatus(): LoadingStatus {
    return this.loadingState.status
  }
  private setLoadingStatus(status: LoadingStatus): void {
    this.loadingState.status = status
  }
  private setLoadingCode(code: number): void {
    this.loadingState.code = code
  }

  get cardIsLoading(): boolean {
    return this.loadingState.status === 'loading'
  }
  get cardIsLoaded(): boolean {
    return this.loadingState.status === 'success'
  }
  get cardLoadingFailed(): boolean {
    return this.loadingState.status === 'error'
  }
  get cardNotFound(): boolean {
    return this.loadingState.code === 404
  }
  get unknownError(): boolean {
    return (
      this.loadingState.code !== null &&
      isUnknownError(this.loadingState.code, this.loadingState.handledErrors)
    )
  }

  loadCard(id: string): void {
    this.setLoadingStatus('loading')

    getCard(id, {
      success: (data) => {
        this.setCard(data)
        this.setLoadingStatus('success')
        this.setLoadingCode(200)
      },
      error: (error) => {
        this.setLoadingCode(error.status)
        this.setLoadingStatus('error')
      },
    })
  }

  deleteCard(): void {
    deleteCard(this.card!._id)
  }
}
