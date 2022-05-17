import { LoadingStatus } from '../stores/entities/loading-state'

export const isSuccessCode = (code: number): boolean => {
  return code / 100 === 2
}
export const isErrorCode = (code: number): boolean => {
  return !isSuccessCode(code)
}

export const isUnknownError = (errorCode: number, handledErrors: Array<number>): boolean => {
  return handledErrors.every((handledError) => handledError !== errorCode)
}

export const getStatusByCode = (code: number | null): LoadingStatus => {
  if (code === null) {
    return 'loading'
  }

  if (isSuccessCode(code)) {
    return 'success'
  }

  return 'error'
}
