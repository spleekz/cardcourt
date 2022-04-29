import { EmptyFunction } from '../basic-utility-types'
import {
  Card,
  CardCountResponse,
  CardsResponse,
  CreateCardResponse,
  GetCardCountParams,
  GetCardsParams,
  HttpResponse,
  LoginUserData,
  LoginUserResponse,
  MessageResponse,
  PublicUserInfo,
  RegisterUserData,
  RegisterUserResponse,
  SendedCard,
  UpdateCardResponse,
  UpdatedCard,
} from './api'

export type FnToCallAfterRequest = (response: CardsResponse) => void

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
export type CardsResponsePromise = Promise<CardsResponse>
export type GetCardsFn = (config: GetCardsConfig) => CardsResponsePromise

//Get card
export type CardResponsePromise = Promise<Card>
export type GetCardFn = (id: string) => CardResponsePromise

//Create card
export type CreateCardResponsePromise = Promise<CreateCardResponse>
export type CreateCardFn = (card: SendedCard) => CreateCardResponsePromise

//Delete card
export type DeleteCardFn = (id: string) => Promise<HttpResponse<MessageResponse, MessageResponse>>

//Update card
export type UpdateCardResponsePromise = Promise<UpdateCardResponse>
export type UpdateCardFn = (card: UpdatedCard) => UpdateCardResponsePromise

//Get card count
export type GetCardCountResponsePromise = Promise<CardCountResponse>
export type GetCardCountFn = (params: GetCardCountParams) => GetCardCountResponsePromise

//!User
//Get user info
export type GetUserInfoResponsePromise = Promise<PublicUserInfo>
export type GetUserInfoFn = (userName: string) => GetUserInfoResponsePromise

//Register user
export type RegisterUserResponsePromise = Promise<RegisterUserResponse>
export type RegisterUserFn = (registerUserData: RegisterUserData) => RegisterUserResponsePromise

//Login user
export type LoginUserResponsePromise = Promise<LoginUserResponse>
export type LoginUserFn = (loginUserData: LoginUserData) => LoginUserResponsePromise
