import React from 'react'

import { EasyInputStore } from 'stores/card-check-store/play-session/easy-input-store'
import { HardInputStore } from 'stores/card-check-store/play-session/hard-input-store'

import { EasyPlayInput } from './easy-input'
import { HardPlayInput } from './hard-input'

export type PlayInputProps<InputStoreType extends EasyInputStore | HardInputStore> = {
  inputStore: InputStoreType
  value: string
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export const PlayInput: React.FC<PlayInputProps<EasyInputStore | HardInputStore>> = ({
  inputStore,
  value,
  onKeyPress,
}) => {
  return (
    <>
      {inputStore instanceof EasyInputStore && (
        <EasyPlayInput inputStore={inputStore} value={value} onKeyPress={onKeyPress} />
      )}
      {inputStore instanceof HardInputStore && (
        <HardPlayInput inputStore={inputStore} value={value} onKeyPress={onKeyPress} />
      )}
    </>
  )
}
