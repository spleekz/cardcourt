import { CardsStore, ICardsStore } from '../CardsStore'
import { ICheckStore, CheckStore } from '../CheckStore'

export interface IRootStore {
  CardsStore: ICardsStore
  createCheckStore: () => ICheckStore
}

export class RootStore implements IRootStore {
  CardsStore = new CardsStore()
  createCheckStore = (): ICheckStore => {
    return new CheckStore()
  }
}
