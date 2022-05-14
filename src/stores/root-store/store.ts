import { CardsStore } from '../cards-store'
import { CheckStore } from '../check-store'
import { AppStore } from '../app-store'
import { CardSlider, SliderConfig } from '../card-slider'
import { CurrentUserStore } from '../current-user-store'
import { CurrentCardStore } from '../current-card-store'
import { AuthStore } from '../auth-store/auth-store'

export class RootStore {
  appStore: AppStore = new AppStore()
  authStore: AuthStore = new AuthStore()
  cardsStore: CardsStore = new CardsStore()

  createCardSlider(config: SliderConfig): CardSlider {
    return new CardSlider(config)
  }
  createCurrentUserStore(userName: string): CurrentUserStore {
    return new CurrentUserStore(userName)
  }
  createCheckStore(): CheckStore {
    return new CheckStore()
  }
  createCurrentCardStore = (cardId: string): CurrentCardStore => {
    return new CurrentCardStore(cardId, this.authStore)
  }
}
