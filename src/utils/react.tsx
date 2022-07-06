import React from 'react'

import { areSameArrays } from './arrays'

export const isEmptyElement = (
  element: React.ReactChild | React.ReactFragment | React.ReactPortal,
): boolean => {
  if (React.isValidElement(element)) {
    const children = element.props.children
    if (Array.isArray(children)) {
      return areSameArrays(children, [null]) || areSameArrays(children, [false])
    } else {
      return Boolean(!children)
    }
  }
  return true
}
