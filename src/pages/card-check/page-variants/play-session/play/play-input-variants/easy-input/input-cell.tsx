import React from 'react'

import { observer } from 'mobx-react-lite'
import { CaretDownFill } from 'react-bootstrap-icons'
import styled from 'styled-components'

type Props = {
  value: string
  highlighting: boolean
  highlightColor: string | null
  focused: boolean
  selected: boolean
  currentSelected: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export const InputCell = observer<Props, HTMLInputElement | null>(
  (
    {
      value,
      highlighting,
      highlightColor,
      focused,
      selected,
      currentSelected,
      onChange,
      onClick,
      onKeyPress,
      onKeyDown,
      onKeyUp,
    },
    ref,
  ) => {
    return (
      <Container>
        {focused && (
          <Caret>
            <CaretDownFill size={28} />
          </Caret>
        )}
        {currentSelected && (
          <Caret>
            <CaretDownFill size={28} stroke={'#000000'} fill={'#ecb500'} />
          </Caret>
        )}
        <Cell
          ref={ref}
          value={value}
          highlighting={highlighting}
          highlightColor={highlightColor}
          onChange={onChange}
          onClick={onClick}
          onKeyPress={onKeyPress}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          selected={selected}
        />
      </Container>
    )
  },
  { forwardRef: true },
)
InputCell.displayName = 'InputCell'

const Container = styled.div`
  position: relative;
`
const Cell = styled.input<{
  selected: boolean
  highlighting: boolean
  highlightColor: string | null
}>`
  width: 50px;
  height: 70px;
  font-size: 40px;
  margin: 0 10px;
  text-align: center;
  border: 2px solid #373737;
  border-radius: 6px;
  background-color: ${(props) =>
    (props.highlightColor && props.highlightColor) || (props.selected && '#fffb85')};
  caret-color: transparent;
  transition: ${(props) => props.highlighting && '0.3s'};
`
const Caret = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
`
