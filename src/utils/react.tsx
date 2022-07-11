import React from 'react'

import { isArray } from './arrays'

export const isElementEmpty = (
  element: React.ReactChild | React.ReactFragment | React.ReactPortal,
): boolean => {
  if (element === false || element === null || element === undefined) {
    return true
  } else {
    if (React.isValidElement(element)) {
      const children = element.props.children
      if (children) {
        if (isArray(children)) {
          return children.every(isElementEmpty)
        } else {
          return isElementEmpty(children)
        }
      }
      return false
    }
    return false
  }
}
