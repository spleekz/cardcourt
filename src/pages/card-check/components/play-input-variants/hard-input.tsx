import React, { useEffect, useRef } from 'react'

import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { usePlaySession } from 'pages/card-check/page-variants/play-session/play-session'

import { HardInputStore } from 'stores/card-check-store/play-session/hard-input-store'

import { PlayInputProps } from './play-input'

type Props = PlayInputProps<HardInputStore>

export const HardPlayInput: React.FC<Props> = observer(({ inputStore, value, onKeyPress }) => {
  const playSession = usePlaySession()

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [playSession.currentWordIndex])

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    inputStore.setValue(e.target.value)
  }
  return (
    <StyledInput
      ref={inputRef}
      placeholder={`hard input`}
      onChange={onInputChange}
      value={value}
      onKeyPress={onKeyPress}
    />
  )
})

const StyledInput = styled.input`
  border: 2px solid #373737;
  font-size: 48px;
  padding: 4px;
  border-radius: 6px;
  margin-right: 20px;
`
