import React from 'react'

export const isElementEmpty = (
  element: React.ReactChild | React.ReactFragment | React.ReactPortal,
): boolean => {
  if (element === false || element === null || element === undefined) {
    return true
  } else {
    if (React.isValidElement(element)) {
      const children = element.props.children
      if (children) {
        if (Array.isArray(children)) {
          return children.every(isElementEmpty)
        } else {
          return children === false || children === null || children === undefined
        }
      }
      return false
    }
    return false
  }
}
