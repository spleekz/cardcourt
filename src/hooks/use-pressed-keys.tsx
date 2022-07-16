import React, { useEffect, useState } from 'react'

type PressedKeysSet = Set<string>

type usePressedKeysOptions = {
  repeatable?: boolean
}

export const usePressedKeys = (
  ref: React.RefObject<HTMLElement | null>,
  options?: usePressedKeysOptions,
): PressedKeysSet => {
  const { repeatable = false } = options ?? {}

  const [pressedKeys, setPressedKeys] = useState<PressedKeysSet>(new Set())

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent): void => {
      if (!repeatable && e.repeat) {
        return
      }

      setPressedKeys((prev) => new Set(prev.add(e.code)))
    }
    const onKeyUp = (e: KeyboardEvent): void => {
      setPressedKeys((prev) => {
        const prevCopy = prev
        prevCopy.delete(e.code)
        return new Set(prevCopy)
      })
    }
    const onBlur = (): void => {
      setPressedKeys(new Set())
    }

    ref.current?.addEventListener('keydown', onKeyDown)
    ref.current?.addEventListener('keyup', onKeyUp)
    ref.current?.addEventListener('blur', onBlur, true)

    return () => {
      ref.current?.removeEventListener('keydown', onKeyDown)
      ref.current?.removeEventListener('keyup', onKeyUp)
      ref.current?.removeEventListener('blur', onBlur, true)
    }
  }, [])

  //Очищать нажатые клавиши при alt+tab / win+d / смене вкладки
  useEffect(() => {
    const clearPressedKeys = (): void => {
      setPressedKeys(new Set())
    }

    window.addEventListener('focus', clearPressedKeys)

    return () => window.removeEventListener('focus', clearPressedKeys)
  }, [])

  return pressedKeys
}
