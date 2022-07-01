import { AnyObject } from 'basic-utility-types'

export const areSameObjects = (object1: AnyObject, object2: AnyObject): boolean => {
  const object1Length = Object.keys(object1).length
  const object2Length = Object.keys(object2).length

  if (object1Length === object2Length) {
    const length = object1Length
    let matched = 0

    for (const key in object1) {
      if (object1[key] === object2[key]) {
        matched = matched + 1
      }
    }

    if (matched === length) {
      return true
    }

    return false
  }
  return false
}
