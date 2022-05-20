import { useEffect, useState } from 'react'

import { EmptyFunction } from 'basic-utility-types'

export const useSkipForFirstEffectRun = (
  fn: EmptyFunction,
  deps: React.DependencyList | undefined,
): void => {
  const [isFirstEffect, setIsFirstEffect] = useState(true)
  useEffect(() => {
    if (isFirstEffect) {
      setIsFirstEffect(false)
    } else {
      fn()
    }
  }, deps)
}
