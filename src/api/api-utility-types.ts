import { EmptyFunction } from '../basic-utility-types'
import {
  Card,
  CardsResponse,
  CreateCardResponse,
  GetCardsParams,
  HttpResponse,
  MessageResponse,
  PublicUserInfo,
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

//Get user info
export type GetUserInfoResponsePromise = Promise<PublicUserInfo>
export type GetUserInfoFn = (userName: string) => GetUserInfoResponsePromise
