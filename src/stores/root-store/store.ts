import { CardsStore, ICardsStore } from '../cards-store'
import { ICheckStore, CheckStore } from '../check-store'
import { IAppStore, AppStore } from '../app-store'
import { IAuthStore, AuthStore } from '../auth-store'
import { ICardsSlider, CardsSliderStore, SliderConfig } from '../cards-slider-store'
import { IUsersStore, UsersStore } from '../users-store'

export interface IRootStore {
  appStore: IAppStore
  authStore: IAuthStore
  cardsStore: ICardsStore
  usersStore: IUsersStore
  createCardsSliderStore(config: SliderConfig): ICardsSlider
  createCheckStore(): ICheckStore
}

export class RootStore implements IRootStore {
  appStore = new AppStore()
  authStore = new AuthStore()
  cardsStore = new CardsStore()
  usersStore = new UsersStore()
  createCardsSliderStore = (config: SliderConfig): ICardsSlider => {
    return new CardsSliderStore(config)
  }
  createCheckStore = (): ICheckStore => {
    return new CheckStore()
  }
}
