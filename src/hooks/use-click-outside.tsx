import React, { useEffect } from 'react'

import { EmptyFunction } from 'basic-utility-types'

interface Config {
  ref: React.RefObject<HTMLElement | null>
  fn: EmptyFunction
}

export const useClickOutside = ({ ref, fn }: Config): void => {
  useEffect(() => {
    const handleClickOutside = (event: Event): void => {
      if (!ref.current?.contains(event.target as Node)) {
        fn()
      }
    }

    if (ref.current) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => document.removeEventListener('click', handleClickOutside)
  }, [fn])
}
