import express from 'express'

export enum ServerCodes {
  Success = 0,
  Error = 1,
  Message = 2,
}
  
interface DefaultResponse {
  code: ServerCodes
}
interface ResponseWithData<T> extends DefaultResponse {
  code: ServerCodes.Success
  data: T
}
interface ResponseWithMessage extends DefaultResponse {
  code: ServerCodes.Error | ServerCodes.Message
  message: string
}

export type Request<T> = express.Request<{}, {}, T>
export type Response<T = void> = express.Response<ResponseWithData<T> | ResponseWithMessage>
