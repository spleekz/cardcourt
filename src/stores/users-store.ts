import { api, getCards } from '../api'
import { makeAutoObservable } from 'mobx'
import { PublicUserInfo } from '../../../backend/api/api-types'
import { ActionToUpdateCards } from './utility-types'
import { Cards, GetCardsParams, CardsResponse } from '../api/api'

interface User {
  info: {
    name: string
  }
  cards: {
    created: Cards
  }
}

export class UsersStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  user: User | null = null
  setUser(user: User | null): void {
    this.user = user
  }

  private loadUserInfo(name: string): Promise<PublicUserInfo> {
    return api.userInfo.getUserInfo(name).then((res) => {
      return res.data
    })
  }

  private loadUserCards(name?: string): Promise<CardsResponse> {
    const params: GetCardsParams = {
      pagesToLoad: 2,
      pageSize: 3,
      by: name || this.user?.info.name,
    }
    return getCards({ params })
  }
  setUserCards: ActionToUpdateCards = (cards) => {
    const prevCards = this.user!.cards.created
    prevCards.length = 0
    prevCards.push.apply(prevCards, cards)
  }
  pushUserCards: ActionToUpdateCards = (cards) => {
    this.user!.cards.created.push.apply(this.user!.cards!.created, cards)
  }

  //Одним экшеном грузим инфу и карточки
  loadUser(name: string): void {
    const loadInfoPromise = this.loadUserInfo(name)
    const loadCardsPromise = this.loadUserCards(name)

    Promise.all([loadInfoPromise, loadCardsPromise]).then(([infoResponse, cardsResponse]) => {
      const user: User = { info: infoResponse, cards: { created: cardsResponse.cards } }

      this.setUser(user)
    })
  }
}
