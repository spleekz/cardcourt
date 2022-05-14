import { makeAutoObservable } from 'mobx'
import { Cards, SendedCard } from '../api/api'
import { createCard } from '../api'
import { CreateCardResponsePromise, StatusCodes } from '../api/api-utility-types'
import { LoadingState } from './entities/loading-state'

export class CardsStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  cards: Cards = []

  cardCreatingLoadingState = new LoadingState({
    handledErrors: [StatusCodes.sameCardName],
  })

  createCard(card: SendedCard): CreateCardResponsePromise {
    this.cardCreatingLoadingState.setStatus('loading')

    return createCard(card, {
      success: () => {
        this.cardCreatingLoadingState.setCode(200)
        this.cardCreatingLoadingState.setStatus('success')
      },
      error: (error) => {
        this.cardCreatingLoadingState.setCode(error.status)
        this.cardCreatingLoadingState.setStatus('error')
      },
    })
  }
}
