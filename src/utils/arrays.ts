export const areSameArrays = (array1: Array<any>, array2: Array<any>): boolean => {
  if (array1.length === array2.length) {
    return array1.every((el, index) => el === array2[index])
  }
  return false
}
