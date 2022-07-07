import React from 'react'

import * as CSS from 'csstype'

import { CelledInputStore } from 'stores/card-check-store/play-session/celled-input-store'
import { DefaultInputStore } from 'stores/card-check-store/play-session/default-input-store'

import { CelledPlayInput } from './variants/celled-input/celled-input'
import { DefaultPlayInput } from './variants/default-input'

export type PlayInputProps<InputStoreType extends CelledInputStore | DefaultInputStore> = {
  inputStore: InputStoreType
  value: string
  enterHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void
  readonly?: boolean
  styles?: CSS.Properties
}

export const PlayInput: React.FC<PlayInputProps<CelledInputStore | DefaultInputStore>> = ({
  inputStore,
  readonly,
  value,
  enterHandler,
  styles,
}) => {
  return (
    <>
      {inputStore instanceof CelledInputStore && (
        <CelledPlayInput
          inputStore={inputStore}
          readonly={readonly}
          value={value}
          enterHandler={enterHandler}
          styles={styles}
        />
      )}
      {inputStore instanceof DefaultInputStore && (
        <DefaultPlayInput
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
