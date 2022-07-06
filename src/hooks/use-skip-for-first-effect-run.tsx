import { useEffect, useRef } from 'react'

import { EmptyFunction } from 'basic-utility-types'

export const useSkipForFirstEffectRun = (
  fn: EmptyFunction,
  deps: React.DependencyList | undefined,
): void => {
  const isFirstEffectRun = useRef(true)

  useEffect(() => {
    if (isFirstEffectRun.current) {
      isFirstEffectRun.current = false
    } else {
      fn()
    }
  }, deps)
}
