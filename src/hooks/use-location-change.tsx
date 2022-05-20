import { EmptyFunction } from 'basic-utility-types'
import { useLocation } from 'react-router-dom'

import { useSkipForFirstEffectRun } from './use-skip-for-first-effect-run'

export const useLocationChange = (fn: EmptyFunction): void => {
  const location = useLocation()

  useSkipForFirstEffectRun(fn, [location.key])
}
