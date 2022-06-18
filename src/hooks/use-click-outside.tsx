import React, { useCallback, useEffect } from 'react'

import { EmptyFunction } from 'basic-utility-types'

interface Config {
  ref: React.MutableRefObject<HTMLDivElement | null>
  fn: EmptyFunction
}

export const useClickOutside = ({ ref, fn }: Config): void => {
  const handleClickOutside = useCallback(
    (event: MouseEvent): void => {
      if (!ref.current?.contains(event.target as Node)) {
        fn()
      }
    },
    [fn],
  )

  useEffect(() => {
    if (ref.current) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => document.removeEventListener('click', handleClickOutside)
  }, [ref.current, handleClickOutside])
}
