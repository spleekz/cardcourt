import { CardsStore } from '../cards-store'
import { CheckStore } from '../check-store'
import { AppStore } from '../app-store'
import { AuthStore } from '../auth-store'
import { CardsSliderStore, SliderConfig } from '../cards-slider-store'
import { UsersStore } from '../users-store'

export class RootStore {
  appStore: AppStore = new AppStore()
  authStore: AuthStore = new AuthStore()
  cardsStore: CardsStore = new CardsStore()
  usersStore: UsersStore = new UsersStore()
  createCardsSliderStore(config: SliderConfig): CardsSliderStore {
    return new CardsSliderStore(config)
  }
  createCheckStore(): CheckStore {
    return new CheckStore()
  }
}
