import { Card } from 'api/api'

import { AppStore } from 'stores/app-store'
import { AuthStore } from 'stores/auth-store/auth-store'
import { CardCheckStore } from 'stores/card-check-store/check-store'
import { CardSlider, SliderConfig } from 'stores/card-slider'
import { CardsStore } from 'stores/cards-store'
import { CurrentCardStore } from 'stores/current-card-store'
import { CurrentUserStore } from 'stores/current-user-store'

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
  createCardCheckStore(card: Card): CardCheckStore {
    return new CardCheckStore(card)
  }
  createCurrentCardStore = (cardId: string): CurrentCardStore => {
    return new CurrentCardStore(cardId, this.authStore)
  }
}
