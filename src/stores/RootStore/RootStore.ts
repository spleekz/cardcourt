import { CardsStore, ICardsStore } from '../CardsStore'
export interface IRootStore {
  CardsStore: ICardsStore
}

export class RootStore implements IRootStore {
  CardsStore = new CardsStore()
}
