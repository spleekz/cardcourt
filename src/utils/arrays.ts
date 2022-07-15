import { getRandom } from './numbers'

export const getRandomArrayElement = <T>(array: Array<T>): T => {
  const index = getRandom(0, array.length - 1)
  return array[index]
}
