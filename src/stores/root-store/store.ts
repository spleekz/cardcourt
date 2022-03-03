import { CardsStore, ICardsStore } from '../cards-store'
import { ICheckStore, CheckStore } from '../check-store'
import { IAppStore, AppStore } from '../app-store'
import { IAuthStore, AuthStore } from '../auth-store'
import { ICardsSliderStore, CardsSliderStore, SliderConfig } from '../cards-slider-store'

export interface IRootStore {
  appStore: IAppStore
  cardsSliderStore: ICardsSliderStore
  cardsStore: ICardsStore
  createCardsSliderStore(config: SliderConfig): ICardsSliderStore
}

export class RootStore implements IRootStore {
  appStore = new AppStore()
  cardsStore = new CardsStore()
  createCardsSliderStore = (config: SliderConfig): ICardsSliderStore => {
    return new CardsSliderStore(this.cardsStore, config)
  }
  createCheckStore = (): ICheckStore => {
    return new CheckStore()
  }
}
