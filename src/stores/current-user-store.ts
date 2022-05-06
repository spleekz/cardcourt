import { makeAutoObservable } from 'mobx'
import { getCards, getUserInfo } from '../api'
import { Cards, GetCardsParams, PublicUserInfo } from '../api/api'
import { GetCardsResponsePromise, GetUserInfoResponsePromise } from '../api/api-utility-types'
import { LoadingState } from './entities/loading-state'
import { ActionToUpdateCards } from './stores-utility-types'

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

  userLoadingState = new LoadingState({ handledErrors: [404] })
  userCardsLoadingState = new LoadingState({ handledErrors: [] })

  loadInfo(name: string): GetUserInfoResponsePromise {
    return getUserInfo(name, {
      error: (error) => {
        this.userLoadingState.setCode(error.status)
        this.userLoadingState.setStatus('error')
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

  loadUser(name: string): void {
    this.userLoadingState.setStatus('loading')
    this.userCardsLoadingState.setStatus('loading')

    this.loadInfo(name).then((infoResponse) => {
      this.loadCreatedCards(name).then((createdCardsResponse) => {
        this.setInfo(infoResponse)
        this.setCreatedCards(createdCardsResponse.cards)

        this.userCardsLoadingState.setCode(200)
        this.userCardsLoadingState.setStatus('success')

        this.userLoadingState.setCode(200)
        this.userLoadingState.setStatus('success')
      })
    })
  }
}
