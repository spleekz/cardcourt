import { Api, GetCardsParams, CardsResponse } from './api'

export const api = new Api({
  baseUrl: 'http://localhost:4400',
  baseApiParams: {
    secure: true,
  },
  securityWorker: (token) => (token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
})

export type FnToCallAfterRequest = (response: CardsResponse) => void

export interface GetCardsConfig {
  params: GetCardsParams
  fnToCall: FnToCallAfterRequest
}

type GetCardsFn = (config: GetCardsConfig) => Promise<CardsResponse>

export const getCards: GetCardsFn = ({ params = {}, fnToCall }) => {
  const { page = 1, pagesToLoad = 1, pageSize = 5, search = '', by = '' } = params
  return api.cards.getCards({ page, pagesToLoad, pageSize, search, by }).then((res) => {
    if (res.ok) {
      fnToCall(res.data)
    }
    return {
      cards: res.data.cards,
      maxLoadedPage: res.data.maxLoadedPage,
      pageCount: res.data.pageCount,
    }
  })
}
