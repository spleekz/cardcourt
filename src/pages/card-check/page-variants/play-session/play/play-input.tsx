import React from 'react'

import * as CSS from 'csstype'

import { EasyInputStore } from 'stores/card-check-store/play-session/easy-input-store'
import { HardInputStore } from 'stores/card-check-store/play-session/hard-input-store'

import { EasyPlayInput } from './play-input/variants/easy-input/easy-input'
import { HardPlayInput } from './play-input/variants/hard-input'

export type PlayInputProps<InputStoreType extends EasyInputStore | HardInputStore> = {
  inputStore: InputStoreType
  value: string
  enterHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void
  readonly?: boolean
  styles?: CSS.Properties
}

export const PlayInput: React.FC<PlayInputProps<EasyInputStore | HardInputStore>> = ({
  inputStore,
  readonly,
  value,
  enterHandler,
  styles,
}) => {
  return (
    <>
      {inputStore instanceof EasyInputStore && (
        <EasyPlayInput
          inputStore={inputStore}
          readonly={readonly}
          value={value}
          enterHandler={enterHandler}
          styles={styles}
        />
      )}
      {inputStore instanceof HardInputStore && (
        <HardPlayInput
          inputStore={inputStore}
          readonly={readonly}
          value={value}
          enterHandler={enterHandler}
          styles={styles}
        />
      )}
    </>
  )
}
