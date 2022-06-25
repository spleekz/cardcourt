import { useEffect, useRef } from 'react'

type PressedKeysSet = Set<string>

type UsePressedKeysReturn = [
  PressedKeysSet,
  //addPressedKey
  (key: string) => void,
  //deletePressedKey
  (key: string) => void,
]

export const usePressedKeys = (): UsePressedKeysReturn => {
  //Использую ref, чтобы не было ререндера после нажатия любой клавиши
  const pressedKeys = useRef<PressedKeysSet>(new Set())

  //Очищать нажатые клавиши при alt+tab / win+d
  useEffect(() => {
    const clearPressedKeys = (): void => {
      pressedKeys.current = new Set()
    }

    document.addEventListener('visibilitychange', clearPressedKeys)

    return () => document.removeEventListener('visibilitychange', clearPressedKeys)
  }, [])

  const addPressedKey = (key: string): void => {
    pressedKeys.current.add(key)
  }

  const deletePressedKey = (key: string): void => {
    pressedKeys.current.delete(key)
  }

  return [pressedKeys.current, addPressedKey, deletePressedKey]
}
