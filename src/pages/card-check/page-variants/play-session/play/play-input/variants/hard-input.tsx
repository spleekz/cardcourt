import React, { useEffect, useRef } from 'react'

import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { HardInputStore } from 'stores/card-check-store/play-session/hard-input-store'

import { useClickOutside } from 'hooks/use-click-outside'

import { PlayInputProps } from '../../play-input'

type Props = PlayInputProps<HardInputStore>

export const HardPlayInput: React.FC<Props> = observer(
  ({ inputStore, readonly, value, highlighting, highlightColor, enterHandler }) => {
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
        highlighting={highlighting}
        highlightColor={highlightColor}
        placeholder={`Напечатайте перевод`}
        onClick={inputStore.focusInput}
        onChange={onInputChange}
        onKeyPress={enterHandler}
      />
    )
  },
)

const StyledInput = styled.input<{ highlighting: boolean; highlightColor: string | null }>`
  width: 580px;
  border: 2px solid #373737;
  font-size: 40px;
  padding: 4px;
  border-radius: 6px;
  margin-right: 20px;
  background-color: ${(props) => props.highlightColor && props.highlightColor};
  transition: ${(props) => props.highlighting && '0.3s'};
`
