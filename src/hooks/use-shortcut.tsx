import { useEffect } from 'react'

import { EmptyFunction } from 'basic-utility-types'

import { areSame } from 'utils/comparison'

import { usePressedKeys } from './use-pressed-keys'

type UseShortcutOptions = {
  repeatable: boolean
}

export const useShortcut = (
  ref: React.RefObject<HTMLElement | null>,
  shortcut: Array<string>,
  fn: EmptyFunction,
  options?: UseShortcutOptions,
): void => {
  const { repeatable = false } = options ?? {}

  const pressedKeys = usePressedKeys(ref, { repeatable })

  useEffect(() => {
    const pressedKeysArray = Array.from(pressedKeys)
    if (areSame(pressedKeysArray, shortcut)) {
      fn()
    }
  }, [pressedKeys])
}
