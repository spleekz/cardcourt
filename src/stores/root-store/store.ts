import { CardsStore, ICardsStore } from '../cards-store'
import { ICheckStore, CheckStore } from '../check-store'
import { IAppStore, AppStore } from '../app-store'
import { IAuthStore, AuthStore } from '../auth-store'
import { ICardsSliderStore, CardsSliderStore } from '../cards-slider-store'

export interface IRootStore {
  appStore: IAppStore
  cardsSliderStore: ICardsSliderStore
  cardsStore: ICardsStore
  authStore: IAuthStore
  createCheckStore: () => ICheckStore
}

export class RootStore implements IRootStore {
  appStore = new AppStore()
  cardsSliderStore = new CardsSliderStore()
  cardsStore = new CardsStore(this.cardsSliderStore)
  authStore = new AuthStore()
  createCheckStore = (): ICheckStore => {
    return new CheckStore()
  }
}
