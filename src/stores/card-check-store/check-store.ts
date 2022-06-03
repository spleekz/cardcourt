import { makeAutoObservable } from 'mobx'

import { Card } from 'api/api'

import { CardCheckPlaySessionStore } from './play-session-store'
import { CardCheckSettingsStore } from './settings-store'

export type CheckState = 'settings' | 'session'

export class CardCheckStore {
  card: Card
  playSession: CardCheckPlaySessionStore | null = null

  constructor(card: Card) {
    this.card = card

    makeAutoObservable(this, {}, { autoBind: true })
  }

  checkState: CheckState = 'settings'
  setCheckState(state: CheckState): void {
    this.checkState = state
  }
  goToSettings(): void {
    this.setCheckState('settings')
  }
  startPlaySession(): void {
    this.createPlaySession()
    this.setCheckState('session')
  }

  settings = new CardCheckSettingsStore()

  createPlaySession(): void {
    this.playSession = new CardCheckPlaySessionStore({ card: this.card, settings: this.settings })
  }
  deletePlaySession(): void {
    this.playSession = null
  }
}
