import { AnyObject } from 'basic-utility-types'

import { isObject } from './objects'

const areSameArrays = (array1: Array<any>, array2: Array<any>): boolean => {
  if (array1.length === array2.length) {
    return array1.every((el, index) => areSame(el, array2[index]))
  }
  return false
}

const areSameObjects = (object1: AnyObject, object2: AnyObject): boolean => {
  const object1Length = Object.keys(object1).length
  const object2Length = Object.keys(object2).length

  if (object1Length === object2Length) {
    const length = object1Length
    let matched = 0

    for (const key in object1) {
      if (areSame(object1[key], object2[key])) {
        matched = matched + 1
      } else {
        return false
      }
    }

    if (matched === length) {
      return true
    }

    return false
  }
  return false
}

export const areSame = (value1: any, value2: any): boolean => {
  if (typeof value1 === typeof value2) {
    if (Array.isArray(value1) && Array.isArray(value2)) {
      return areSameArrays(value1, value2)
    } else if (isObject(value1) && isObject(value2)) {
      return areSameObjects(value1, value2)
    } else {
      return value1 === value2
    }
  } else {
    return false
  }
}
