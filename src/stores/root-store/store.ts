import { CardsStore, ICardsStore } from '../cards-store'
import { ICheckStore, CheckStore } from '../check-store'
import { IAppStore, AppStore } from '../app-store'
import { IAuthStore, AuthStore } from '../auth-store'
import { ICardsSliderStore, CardsSliderStore, SliderConfig } from '../cards-slider-store'
import { IUsersStore, UsersStore } from '../users-store'

export interface IRootStore {
  appStore: IAppStore
  authStore: IAuthStore
  cardsStore: ICardsStore
  usersStore: IUsersStore
  createCardsSliderStore(config: SliderConfig): ICardsSliderStore
  createCheckStore(): ICheckStore
}

export class RootStore implements IRootStore {
  appStore = new AppStore()
  authStore = new AuthStore()
  cardsStore = new CardsStore()
  usersStore = new UsersStore()
  createCardsSliderStore = (config: SliderConfig): ICardsSliderStore => {
    return new CardsSliderStore(this.cardsStore, config)
  }
  createCheckStore = (): ICheckStore => {
    return new CheckStore()
  }
}
