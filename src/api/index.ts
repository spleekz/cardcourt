import { Api, GetCardsParams, CardsResponse, Card } from './api'

export const api = new Api({
  baseUrl: 'http://localhost:4400',
  baseApiParams: {
    secure: true,
  },
  securityWorker: (token) => (token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
})

export type FnToCallAfterRequest = (response: CardsResponse) => void
export type EmptyFunction = (...args: Array<any>) => void
export interface RequestErrorHandler {
  code: number
  handle: EmptyFunction
}
export type RequestErrorsHandlers = Array<RequestErrorHandler>

export interface GetCardsConfig {
  params: GetCardsParams
  successFn?: FnToCallAfterRequest
  errors?: RequestErrorsHandlers
  anywayFn?: EmptyFunction
}
export type CardsResponsePromise = Promise<CardsResponse>
type GetCardsFn = (config: GetCardsConfig) => CardsResponsePromise
export const getCards: GetCardsFn = ({ params = {}, successFn, errors, anywayFn }) => {
  const { page = 1, pagesToLoad = 1, pageSize = 5, search = '', by = '' } = params
  return api.cards
    .getCards({ page, pagesToLoad, pageSize, search, by })
    .then((res) => {
      if (res.ok && successFn) {
        successFn(res.data)
      }

      return {
        cards: res.data.cards,
        maxLoadedPage: res.data.maxLoadedPage,
        pageCount: res.data.pageCount,
      }
    })
    .catch((res) => {
      errors?.forEach((error) => {
        if (res.status === error.code) {
          error.handle()
        }
      })
      return Promise.reject()
    })
    .finally(() => anywayFn?.())
}

export type CardResponsePromise = Promise<Card>
export type GetCardFn = (id: string) => CardResponsePromise
export const getCard: GetCardFn = (id) => {
  return api.card.getCard(id).then((res) => {
    return res.data
  })
}
