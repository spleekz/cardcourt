import { api, getCards, FnToCallAfterRequest } from '../api'
import { makeAutoObservable } from 'mobx'
import { PublicUserInfo } from '../../../backend/api/api-types'
import { ActionToUpdateCards } from './utility-types'
import { Cards, GetCardsParams, CardsResponse } from '../api/api'

interface User {
  publicInfo: {
    name: string | null
  }
  publicFeatures: {
    cards: Cards
  }
}

export interface IUsersStore {
  user: User
  setPublicUserInfo(publicUserInfo: PublicUserInfo): void
  loadUserPublicInfo(name: string): void

  loadUserCards: () => Promise<CardsResponse>

  setUserCards: ActionToUpdateCards
  pushUserCards: ActionToUpdateCards

  isCurrentUser: boolean
}

export class UsersStore implements IUsersStore {
  constructor() {
    makeAutoObservable(this)
  }

  user: User = {
    publicInfo: {
      name: null,
    },
    publicFeatures: {
      cards: [],
    },
  }
  setPublicUserInfo(publicUserInfo: PublicUserInfo): void {
    this.user.publicInfo = publicUserInfo
  }
  loadUserPublicInfo(name: string): void {
    api.userInfo.getUserInfo(name).then((res) => {
      if (res.ok) {
        this.setPublicUserInfo(res.data)
      }
    })
  }

  loadUserCards(): Promise<CardsResponse> {
    const params: GetCardsParams = {
      pagesToLoad: 2,
      pageSize: 3,
      by: this.user.publicInfo.name!,
    }
    const fnToCall: FnToCallAfterRequest = (data) => {
      this.setUserCards(data.cards)
    }
    return getCards({ params, fnToCall })
  }

  setUserCards: ActionToUpdateCards = (cards) => {
    const prevCards = this.user.publicFeatures.cards
    prevCards.length = 0
    prevCards.push.apply(prevCards, cards)
  }
  pushUserCards: ActionToUpdateCards = (cards) => {
    this.user.publicFeatures!.cards.push.apply(this.user.publicFeatures!.cards, cards)
  }

  get isCurrentUser(): boolean {
    return this.user.publicInfo !== undefined || this.user.publicFeatures !== undefined
  }
}
