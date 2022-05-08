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

//http коды
export enum StatusCodes {
  longRegisterName = 459,
  sameRegisterName = 460,

  wrongLoginName = 461,
  wrongPassword = 462,

  ok = 200,
  notFound = 404,
}

//Обработка промиса
export type FnToCallAfterRequest<T> = (response: T) => void
export type ErrorFn = (error: { status: number }) => void

export interface PromiseHandlers<PromiseData> {
  success?: FnToCallAfterRequest<PromiseData>
  error?: ErrorFn
  anyway?: EmptyFunction
}

//!Cards
//Get cards
export type GetCardsResponsePromise = Promise<GetCardsResponse>
export type GetCardsFn = (
  params: GetCardsParams,
  handlers?: PromiseHandlers<GetCardsResponse>
) => GetCardsResponsePromise

//Get card
export type GetCardResponsePromise = Promise<GetCardResponse>
export type GetCardFn = (
  id: string,
  handlers?: PromiseHandlers<GetCardResponse>
) => GetCardResponsePromise

//Create card
export type CreateCardResponsePromise = Promise<CreateCardResponse>
export type CreateCardFn = (
  card: SendedCard,
  handlers?: PromiseHandlers<CreateCardResponse>
) => CreateCardResponsePromise

//Delete card
export type DeleteCardResponsePromise = Promise<DeleteCardResponse>
export type DeleteCardFn = (
  id: string,
  handlers?: PromiseHandlers<DeleteCardResponse>
) => DeleteCardResponsePromise

//Update card
export type UpdateCardResponsePromise = Promise<UpdateCardResponse>
export type UpdateCardFn = (
  card: UpdateCardData,
  handlers?: PromiseHandlers<UpdateCardResponse>
) => UpdateCardResponsePromise

//Get card count
export type GetCardCountResponsePromise = Promise<GetCardCountResponse>
export type GetCardCountFn = (
  params: GetCardCountParams,
  handlers?: PromiseHandlers<GetCardCountResponse>
) => GetCardCountResponsePromise

//!User
//Get user info
export type GetUserInfoResponsePromise = Promise<GetUserInfoResponse>
export type GetUserInfoFn = (
  userName: string,
  handlers?: PromiseHandlers<GetUserInfoResponse>
) => GetUserInfoResponsePromise

//Register user
export type RegisterUserResponsePromise = Promise<RegisterUserResponse>
export type RegisterUserFn = (
  registerUserData: RegisterUserData,
  handlers?: PromiseHandlers<RegisterUserResponse>
) => RegisterUserResponsePromise

//Login user
export type LoginUserResponsePromise = Promise<LoginUserResponse>
export type LoginUserFn = (
  loginUserData: LoginUserData,
  hadlers?: PromiseHandlers<LoginUserResponse>
) => LoginUserResponsePromise

//Get me
export type GetMeResponsePromise = Promise<MeResponse>
export type GetMeFn = (handlers?: PromiseHandlers<MeResponse>) => GetMeResponsePromise
