import { CardsStore, ICardsStore } from '../cards-store'
import { ICheckStore, CheckStore } from '../check-store'
import { IAppStore, AppStore } from '../app-store'
import { IAuthStore, AuthStore } from '../auth-store'

export interface IRootStore {
  appStore: IAppStore
  cardsStore: ICardsStore
  authStore: IAuthStore
  createCheckStore: () => ICheckStore
}

export class RootStore implements IRootStore {
  appStore = new AppStore()
  cardsStore = new CardsStore()
  authStore = new AuthStore()
  createCheckStore = (): ICheckStore => {
    return new CheckStore()
  }
}
