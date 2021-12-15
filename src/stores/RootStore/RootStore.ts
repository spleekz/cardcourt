import { CardsStore, ICardsStore } from '../CardsStore'
import { ICheckStore, CheckStore } from '../CheckStore'

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
