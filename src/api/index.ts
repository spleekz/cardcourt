import { Api, HttpResponse } from './api'
import {
  CreateCardFn,
  DeleteCardFn,
  GetCardCountFn,
  GetCardFn,
  GetCardsFn,
  GetMeFn,
  GetUserInfoFn,
  LoginUserFn,
  PromiseHandlers,
  RegisterUserFn,
  UpdateCardFn,
} from './api-utility-types'

export const api = new Api({
  baseUrl: 'http://localhost:4400',
  baseApiParams: {
    secure: true,
  },
  securityWorker: (token) => (token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
})

export function handlePromise<PromiseData>(
  promise: Promise<HttpResponse<PromiseData>>,
  handlers?: PromiseHandlers<PromiseData>,
): Promise<PromiseData> {
  const { success, error, anyway } = handlers || {}

  return promise
    .then((res) => {
      success?.(res.data)

      return res.data
    })
    .catch((res) => {
      error?.(res)

      return Promise.reject()
    })
    .finally(() => anyway?.())
}

//Cards
export const getCards: GetCardsFn = (params, handlers) => {
  return handlePromise(api.cards.getCards(params), handlers)
}

export const getCard: GetCardFn = (id, handlers) => {
  return handlePromise(api.card.getCard(id), handlers)
}

export const createCard: CreateCardFn = (card, handlers) => {
  return handlePromise(api.card.createCard(card), handlers)
}

export const deleteCard: DeleteCardFn = (id, handlers) => {
  return handlePromise(api.card.deleteCard({ _id: id }), handlers)
}

export const updateCard: UpdateCardFn = (card, handlers) => {
  return handlePromise(api.card.updateCard(card), handlers)
}

export const getCardCount: GetCardCountFn = (params, handlers) => {
  return handlePromise(api.cardCount.getCardCount(params), handlers)
}

//User
export const getUserInfo: GetUserInfoFn = (userName, handlers) => {
  return handlePromise(api.userInfo.getUserInfo(userName), handlers)
}

export const registerUser: RegisterUserFn = (registerUserData, handlers) => {
  return handlePromise(api.register.registerUser(registerUserData), handlers)
}

export const loginUser: LoginUserFn = (loginUserData, handlers) => {
  return handlePromise(api.login.loginUser(loginUserData), handlers)
}

export const getMe: GetMeFn = (handlers) => {
  return handlePromise(api.me.getMe(), handlers)
}
