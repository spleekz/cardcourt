import React, { CSSProperties, useEffect, useRef } from 'react'

import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { DefaultInputStore } from 'stores/card-check-store/play-session/default-input-store'

import { useClickOutside } from 'hooks/use-click-outside'

type Props = {
  inputStore: DefaultInputStore
  readonly?: boolean
  value: string
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  styles?: CSSProperties
}

export const DefaultPlayInput: React.FC<Props> = observer(
  ({ inputStore, readonly, value, onKeyPress, styles }) => {
    const inputRef = useRef<HTMLInputElement>(null)

    useClickOutside({ ref: inputRef, fn: inputStore.unfocusInput })

    useEffect(() => {
      if (inputStore.isInputFocused) {
        inputRef.current?.focus()
      } else {
        inputRef.current?.blur()
      }
    }, [inputStore.isInputFocused])

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      inputStore.setValue(e.target.value)
    }

    return (
      <StyledInput
        ref={inputRef}
        readOnly={readonly}
        value={value}
        placeholder={`Напечатайте перевод`}
        onClick={inputStore.focusInput}
        onChange={onInputChange}
        onKeyPress={onKeyPress}
        style={styles}
      />
    )
  },
)

const StyledInput = styled.input`
  width: 580px;
  border: 2px solid #373737;
  font-size: 40px;
  padding: 4px;
  border-radius: 6px;
  margin-right: 20px;
`
