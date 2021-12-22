import { CardsStore, ICardsStore } from '../cards-store'
import { ICheckStore, CheckStore } from '../check-store'
import { IAppStore, AppStore } from '../app-store'

export interface IRootStore {
  appStore: IAppStore
  cardsStore: ICardsStore
  createCheckStore: () => ICheckStore
}

export class RootStore implements IRootStore {
  appStore = new AppStore()
  cardsStore = new CardsStore()
  createCheckStore = (): ICheckStore => {
    return new CheckStore()
  }
}
