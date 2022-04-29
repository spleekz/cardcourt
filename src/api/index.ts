import { Api } from './api'
import {
  CreateCardFn,
  DeleteCardFn,
  GetCardCountFn,
  GetCardFn,
  GetCardsFn,
  GetUserInfoFn,
  LoginUserFn,
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

//Cards
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

export const getCard: GetCardFn = (id) => {
  return api.card.getCard(id).then((res) => {
    return res.data
  })
}

export const createCard: CreateCardFn = (card) => {
  return api.card.createCard(card).then((res) => {
    return res.data
  })
}

export const deleteCard: DeleteCardFn = (id) => {
  return api.card.deleteCard({ _id: id })
}

export const updateCard: UpdateCardFn = (card) => {
  return api.card.updateCard(card).then((res) => res.data)
}

export const getCardCount: GetCardCountFn = (params) => {
  return api.cardCount.getCardCount(params).then((res) => res.data)
}

//User
export const getUserInfo: GetUserInfoFn = (userName) => {
  return api.userInfo.getUserInfo(userName).then((res) => res.data)
}

export const registerUser: RegisterUserFn = (registerUserData) => {
  return api.register.registerUser(registerUserData).then((res) => res.data)
}

export const loginUser: LoginUserFn = (loginUserData) => {
  return api.login.loginUser(loginUserData).then((res) => res.data)
}
