import { isArray } from './arrays'

export const isObject = (value: any): boolean => {
  return typeof value === 'object' && value !== null && !isArray(value)
}
