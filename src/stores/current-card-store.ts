import { makeAutoObservable } from 'mobx'
import { deleteCard, getCard } from '../api'
import { Card } from '../api/api'
import { LoadingStatus } from './stores-utility-types'

export class CurrentCardStore {
  constructor(cardId: string) {
    makeAutoObservable(this, {}, { autoBind: true })

    this.loadCard(cardId)
  }

  card: Card | null
  setCard(card: Card | null): void {
    this.card = card
  }

  cardLoadingStatus: LoadingStatus = 'loading'
  setCardLoadingStatus(status: LoadingStatus): void {
    this.cardLoadingStatus = status
  }

  loadCard(id: string): void {
    this.setCardLoadingStatus('loading')

    getCard(id)
      .then((card) => {
        this.setCard(card)
        this.setCardLoadingStatus('success')
      })
      .catch(() => {
        this.setCard(null)
        this.setCardLoadingStatus('error')
      })
  }

  deleteCard(): void {
    deleteCard(this.card!._id)
  }
}
