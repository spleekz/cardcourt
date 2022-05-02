export const isUnknownError = (errorCode: number, handledErrors: Array<number>): boolean => {
  return handledErrors.every((handledError) => handledError !== errorCode)
}
