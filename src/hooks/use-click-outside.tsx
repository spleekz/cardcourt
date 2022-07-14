import React, { useEffect } from 'react'

import { EmptyFunction } from 'basic-utility-types'

type UseClickOutsideOptions = {
  eventType?: 'click' | 'mousedown' | 'mouseup'
}

type Config = {
  ref: React.RefObject<HTMLElement | null> | Array<React.RefObject<HTMLElement | null>>
  fn: EmptyFunction
  options?: UseClickOutsideOptions
}

export const useClickOutside = ({ ref, fn, options }: Config): void => {
  const { eventType = 'click' } = options ?? {}

  useEffect(() => {
    const checkIfClickOutsideElement = (element: HTMLElement | null, event: Event): boolean => {
      return !element?.contains(event.target as Node)
    }

    const handleClickOutside = (event: Event): void => {
      let isClickOutside = false
      if (Array.isArray(ref)) {
        isClickOutside = ref.every((refElement) =>
          checkIfClickOutsideElement(refElement.current, event),
        )
      } else {
        isClickOutside = checkIfClickOutsideElement(ref.current, event)
      }

      if (isClickOutside) {
        fn()
      }
    }

    if (
      (Array.isArray(ref) && ref.every((refElement) => refElement.current !== null)) ||
      (!Array.isArray(ref) && ref.current !== null)
    ) {
      document.addEventListener(eventType, handleClickOutside, true)
    }

    return () => document.removeEventListener(eventType, handleClickOutside, true)
  })
}
