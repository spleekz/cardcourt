import { makeAutoObservable } from 'mobx'
import { api, CardResponsePromise, getCards, RequestErrorsHandlers } from '../api'
import { Cards, GetCardsParams, PublicUserInfo } from '../api/api'
import { ActionToUpdateCards } from './utility-types'

interface UserInfo {
  name: string
}
interface UserCards {
  created: Cards
}
type UserLoadingState = 'error' | 'loading' | 'success'

export class CurrentUserStore {
  constructor(userName: string) {
    makeAutoObservable(this)

    this.loadUser(userName)
  }

  info: UserInfo
  setInfo(info: UserInfo): void {
    this.info = info
  }

  cards: UserCards = {
    created: [],
  }
  setCreatedCards: ActionToUpdateCards = (cards) => {
    const prevCards = this.cards.created
    prevCards.length = 0
    prevCards.push.apply(prevCards, cards)
  }
  pushCreatedCards: ActionToUpdateCards = (cards) => {
    this.cards.created.push.apply(this.cards!.created, cards)
  }
  userCardsAreFinded = true
  setUserCardsAreFinded(value: boolean): void {
    this.userCardsAreFinded = value
  }

  loadInfo(name: string): Promise<PublicUserInfo | void> {
    return api.userInfo
      .getUserInfo(name)
      .then((res) => {
        return res.data
      })
      .catch(() => this.setUserLoadingState('error'))
  }
  loadCreatedCards(name: string): CardResponsePromise {
    const params: GetCardsParams = {
      pagesToLoad: 2,
      pageSize: 3,
      by: name,
    }
    const successFn = (): void => this.setUserCardsAreFinded(true)
    const errors: RequestErrorsHandlers = [
      {
        code: 404,
        handle: () => this.setUserCardsAreFinded(false),
      },
    ]

    return getCards({ params, successFn, errors })
  }

  userLoadingState: UserLoadingState = 'loading'
  setUserLoadingState(value: UserLoadingState): void {
    this.userLoadingState = value
  }
  loadUser(name: string): void {
    this.setUserLoadingState('loading')
    Promise.all([this.loadInfo(name), this.loadCreatedCards(name)]).then(
      ([infoResponse, createdCardsResponse]) => {
        //Проверяем только infoResponse, т.к. пользователь может быть создан, но у него может не быть карточек(не ошибка)
        if (infoResponse) {
          this.setInfo(infoResponse)
          this.setCreatedCards(createdCardsResponse?.cards || [])
          this.setUserLoadingState('success')
        }
      }
    )
  }
}
