import { CardsStore } from '../cards-store'
import { CheckStore } from '../check-store'
import { AppStore } from '../app-store'
import { AuthStore } from '../auth-store'
import { CardSlider, SliderConfig } from '../card-slider'
import { UsersStore } from '../users-store'

export class RootStore {
  appStore: AppStore = new AppStore()
  authStore: AuthStore = new AuthStore()
  cardsStore: CardsStore = new CardsStore()
  usersStore: UsersStore = new UsersStore()
  createCardSlider(config: SliderConfig): CardSlider {
    return new CardSlider(config)
  }
  createCheckStore(): CheckStore {
    return new CheckStore()
  }
}
