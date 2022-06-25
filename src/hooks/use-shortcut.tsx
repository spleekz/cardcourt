import { EmptyFunction } from 'basic-utility-types'

import { areSameArrays } from 'utils/arrays'

import { usePressedKeys } from './use-pressed-keys'

type UseShortcutOptions = {
  repeatable: boolean
}

type UseShortcutReturn = [
  //onKeyDown
  (e: React.KeyboardEvent<HTMLInputElement>) => void,
  //onKeyUp
  (e: React.KeyboardEvent<HTMLInputElement>) => void,
]

export const useShortcut = (
  shortcut: Array<string>,
  fn: EmptyFunction,
  options?: UseShortcutOptions,
): UseShortcutReturn => {
  const { repeatable = false } = options ?? {}

  const [pressedKeys, addPressedKey, deletePressedKey] = usePressedKeys()

  const checkIfShortcut = (): void => {
    const pressedKeysArray = Array.from(pressedKeys)
    if (areSameArrays(pressedKeysArray, shortcut)) {
      fn()
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (!repeatable && e.repeat) {
      return
    }

    const pressedKeysArray = Array.from(pressedKeys)
    const shortcutWithoutLast = shortcut.slice(0, -1)
    //Если это последний символ комбинации - отключить её дефолтное поведение
    if (
      areSameArrays(pressedKeysArray, shortcutWithoutLast) &&
      e.code === shortcut[shortcut.length - 1]
    ) {
      e.preventDefault()
    }
    addPressedKey(e.code)
    checkIfShortcut()
  }

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    deletePressedKey(e.code)
    checkIfShortcut()
  }

  return [onKeyDown, onKeyUp]
}
