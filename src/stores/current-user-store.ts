import { makeAutoObservable } from 'mobx'
import { getCards, getUserInfo } from '../api'
import { Cards, GetCardsParams, PublicUserInfo } from '../api/api'
import { GetCardsResponsePromise, GetUserInfoResponsePromise } from '../api/api-utility-types'
import { ActionToUpdateCards, LoadingStatus } from './stores-utility-types'

interface UserCards {
  created: Cards
}

export class CurrentUserStore {
  constructor(userName: string) {
    makeAutoObservable(this)

    this.loadUser(userName)
  }

  info: PublicUserInfo
  setInfo(info: PublicUserInfo): void {
    this.info = info
  }

  cards: UserCards = {
    created: [],
  }
  setCreatedCards: ActionToUpdateCards = (cards) => {
    this.cards.created.length = 0
    this.cards.created.push(...cards)
  }
  pushCreatedCards: ActionToUpdateCards = (cards) => {
    this.cards.created.push(...cards)
  }
  get userCreatedCardsAreFinded(): boolean {
    return this.cards.created.length !== 0
  }
  loadInfo(name: string): GetUserInfoResponsePromise {
    return getUserInfo(name)
  }
  loadCreatedCards(name: string): GetCardsResponsePromise {
    const params: GetCardsParams = {
      pagesToLoad: 2,
      pageSize: 3,
      by: name,
    }

    return getCards(params)
  }

  userLoadingState: LoadingStatus = 'loading'
  setUserLoadingState(value: LoadingStatus): void {
    this.userLoadingState = value
  }

  loadUser(name: string): void {
    this.setUserLoadingState('loading')

    this.loadInfo(name)
      .then((infoResponse) => {
        this.loadCreatedCards(name).then((createdCardsResponse) => {
          this.setInfo(infoResponse)
          this.setCreatedCards(createdCardsResponse.cards)
          this.setUserLoadingState('success')
        })
      })
      .catch(() => this.setUserLoadingState('error'))
  }
}
