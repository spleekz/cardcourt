import { makeAutoObservable } from 'mobx'
import { api, getCard } from '../api'
import { Card } from '../api/api'

type LoadingStatus = 'error' | 'loading' | 'success'

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

  deleteCard(_id: string): void {
    api.card.deleteCard({ _id })
  }
}
