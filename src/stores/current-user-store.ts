import { makeAutoObservable } from 'mobx'
import { getCards, getUserInfo } from '../api'
import { Cards, GetCardsParams, PublicUserInfo } from '../api/api'
import { GetCardsResponsePromise, GetUserInfoResponsePromise } from '../api/api-utility-types'
import { ActionToUpdateCards, LoadingState, LoadingStatus } from './stores-utility-types'

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
  get userCreatedCardsFound(): boolean {
    return this.cards.created.length !== 0
  }
  loadInfo(name: string): GetUserInfoResponsePromise {
    return getUserInfo(name, {
      error: (error) => {
        this.setLoadingCode(error.status)
        this.setLoadingStatus('error')
      },
    })
  }
  loadCreatedCards(name: string): GetCardsResponsePromise {
    const params: GetCardsParams = {
      pagesToLoad: 2,
      pageSize: 3,
      by: name,
    }

    return getCards(params)
  }

  private loadingState: LoadingState = {
    status: 'loading',
    handledErrors: [404],
    code: null,
  }
  private setLoadingStatus(status: LoadingStatus): void {
    this.loadingState.status = status
  }
  private setLoadingCode(code: number): void {
    this.loadingState.code = code
  }

  get userIsLoading(): boolean {
    return this.loadingState.status === 'loading'
  }
  get userIsLoaded(): boolean {
    return this.loadingState.status === 'success'
  }
  get userLoadingFailed(): boolean {
    return this.loadingState.status === 'error'
  }
  get userNotFound(): boolean {
    return this.loadingState.code === 404
  }

  loadUser(name: string): void {
    this.setLoadingStatus('loading')

    this.loadInfo(name).then((infoResponse) => {
      this.loadCreatedCards(name).then((createdCardsResponse) => {
        this.setInfo(infoResponse)
        this.setCreatedCards(createdCardsResponse.cards)
        this.setLoadingCode(200)
        this.setLoadingStatus('success')
      })
    })
  }
}
