import { CardsStore, ICardsStore } from '../cards-store'
import { ICheckStore, CheckStore } from '../check-store'
import { IAppStore, AppStore } from '../app-store'
import { IAuthStore, AuthStore } from '../auth-store'
import { ICardsPaginationStore, CardsPaginationStore } from '../cards-pagination-store'

export interface IRootStore {
  appStore: IAppStore
  cardsPaginationStore: ICardsPaginationStore
  cardsStore: ICardsStore
  authStore: IAuthStore
  createCheckStore: () => ICheckStore
}

export class RootStore implements IRootStore {
  appStore = new AppStore()
  cardsPaginationStore = new CardsPaginationStore()
  cardsStore = new CardsStore(this.cardsPaginationStore)
  authStore = new AuthStore()
  createCheckStore = (): ICheckStore => {
    return new CheckStore()
  }
}
