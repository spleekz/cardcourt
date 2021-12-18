import { CardsStore, ICardsStore } from '../cards-store'
import { ICheckStore, CheckStore } from '../check-store'

export interface IRootStore {
  cardsStore: ICardsStore
  createCheckStore: () => ICheckStore
}

export class RootStore implements IRootStore {
  cardsStore = new CardsStore()
  createCheckStore = (): ICheckStore => {
    return new CheckStore()
  }
}
