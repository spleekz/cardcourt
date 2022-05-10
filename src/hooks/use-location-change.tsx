import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { EmptyFunction } from '../basic-utility-types'

export const useLocationChange = (fn: EmptyFunction): void => {
  const location = useLocation()

  const [isFirstEffectRun, setIsFirstEffectRun] = useState(true)
  useEffect(() => {
    if (isFirstEffectRun) {
      setIsFirstEffectRun(false)
    } else {
      fn()
    }
  }, [location.key])
}
