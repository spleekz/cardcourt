import React, { useCallback, useEffect } from 'react'

import { EmptyFunction } from 'basic-utility-types'

interface Config {
  ref: React.MutableRefObject<HTMLDivElement | null>
  fn: EmptyFunction
}

export const useClickOutside = ({ ref, fn }: Config): void => {
  const handleClickOutsidePopover = useCallback((event: MouseEvent): void => {
    if (!ref.current?.contains(event.target as Node)) {
      fn()
    }
  }, [])

  useEffect(() => {
    if (ref.current) {
      document.addEventListener('click', handleClickOutsidePopover)
    }

    return () => document.removeEventListener('click', handleClickOutsidePopover)
  }, [ref.current])
}
