import { EmptyFunction } from '../basic-utility-types'
import {
  GetCardCountResponse,
  GetCardsResponse,
  CreateCardResponse,
  GetCardCountParams,
  GetCardsParams,
  LoginUserData,
  LoginUserResponse,
  MeResponse,
  RegisterUserData,
  RegisterUserResponse,
  SendedCard,
  UpdateCardResponse,
  DeleteCardResponse,
  UpdateCardData,
  GetCardResponse,
  GetUserInfoResponse,
} from './api'

export type FnToCallAfterRequest = (response: GetCardsResponse) => void

//Errors
export interface RequestErrorHandler {
  code: number
  handle: EmptyFunction
}
export type RequestErrorsHandlers = Array<RequestErrorHandler>

//!Cards
//Get cards
export interface GetCardsConfig {
  params: GetCardsParams
  successFn?: FnToCallAfterRequest
  errors?: RequestErrorsHandlers
  anywayFn?: EmptyFunction
}
export type GetCardsResponsePromise = Promise<GetCardsResponse>
export type GetCardsFn = (config: GetCardsConfig) => GetCardsResponsePromise

//Get card
export type GetCardResponsePromise = Promise<GetCardResponse>
export type GetCardFn = (id: string) => GetCardResponsePromise

//Create card
export type CreateCardResponsePromise = Promise<CreateCardResponse>
export type CreateCardFn = (card: SendedCard) => CreateCardResponsePromise

//Delete card
export type DeleteCardResponsePromise = Promise<DeleteCardResponse>
export type DeleteCardFn = (id: string) => DeleteCardResponsePromise

//Update card
export type UpdateCardResponsePromise = Promise<UpdateCardResponse>
export type UpdateCardFn = (card: UpdateCardData) => UpdateCardResponsePromise

//Get card count
export type GetCardCountResponsePromise = Promise<GetCardCountResponse>
export type GetCardCountFn = (params: GetCardCountParams) => GetCardCountResponsePromise

//!User
//Get user info
export type GetUserInfoResponsePromise = Promise<GetUserInfoResponse>
export type GetUserInfoFn = (userName: string) => GetUserInfoResponsePromise

//Register user
export type RegisterUserResponsePromise = Promise<RegisterUserResponse>
export type RegisterUserFn = (registerUserData: RegisterUserData) => RegisterUserResponsePromise

//Login user
export type LoginUserResponsePromise = Promise<LoginUserResponse>
export type LoginUserFn = (loginUserData: LoginUserData) => LoginUserResponsePromise

//Get me
export type GetMeResponsePromise = Promise<MeResponse>
export type GetMeFn = () => GetMeResponsePromise
