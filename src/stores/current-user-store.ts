import { makeAutoObservable } from 'mobx'
import { getCards, getUserInfo } from '../api'
import { Cards, GetCardsParams, PublicUserInfo } from '../api/api'
import {
  GetCardsResponsePromise,
  GetUserInfoResponsePromise,
  StatusCodes,
} from '../api/api-utility-types'
import { LoadingState } from './entities/loading-state'
import { ActionToUpdateCards } from './stores-utility-types'

interface UserCards {
  created: Cards
}

export class CurrentUserStore {
  info: PublicUserInfo

  constructor(userName: string) {
    makeAutoObservable(this, {}, { autoBind: true })

    this.setInfo({ name: userName })
    this.loadUser()
  }

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

  userLoadingState = new LoadingState({
    initialStatus: 'loading',
    handledErrors: [StatusCodes.notFound],
  })
  userCardsLoadingState = new LoadingState({ initialStatus: 'loading', handledErrors: [] })

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

  loadUser(): void {
    const name = this.info.name

    this.userLoadingState.setCode(null)
    this.userCardsLoadingState.setCode(null)

    this.loadInfo(name).then((infoResponse) => {
      this.loadCreatedCards(name).then((createdCardsResponse) => {
        this.setInfo(infoResponse)
        this.setCreatedCards(createdCardsResponse.cards)

        this.userCardsLoadingState.setCode(StatusCodes.ok)

        this.userLoadingState.setCode(StatusCodes.ok)
      })
    })
  }
}
