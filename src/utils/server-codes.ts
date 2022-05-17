export const isSuccessCode = (code: number): boolean => {
  return code / 100 === 2
}
export const isErrorCode = (code: number): boolean => {
  return code / 100 === 4 || code / 100 === 5
}

export const isUnknownError = (errorCode: number, handledErrors: Array<number>): boolean => {
  return handledErrors.every((handledError) => handledError !== errorCode)
}
