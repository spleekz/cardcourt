import React, { CSSProperties, useEffect, useRef } from 'react'

import { observer } from 'mobx-react-lite'
import { CaretDownFill } from 'react-bootstrap-icons'
import styled from 'styled-components'

type Props = {
  readonly?: boolean
  value: string
  focused: boolean
  selected: boolean
  currentSelected: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  styles?: CSSProperties
}

export const InputCell = observer<Props, HTMLInputElement | null>(
  (
    { readonly, value, focused, selected, currentSelected, onChange, onClick, onKeyDown, styles },
    forwardedRef,
  ) => {
    const cellRef = useRef<HTMLInputElement | null>(null)

    const setCellRef = (ref: HTMLInputElement | null): void => {
      cellRef.current = ref
      if (typeof forwardedRef === 'function') {
        forwardedRef(ref)
      }
    }

    useEffect(() => {
      const preventSelection = (): void => {
        if (cellRef.current) {
          //Отмена нативного выделения
          cellRef.current.selectionStart = cellRef.current.selectionEnd
        }
      }

      cellRef.current?.addEventListener('select', preventSelection)

      return () => cellRef.current?.removeEventListener('select', preventSelection)
    }, [cellRef.current])

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
          ref={setCellRef}
          readOnly={readonly}
          value={value}
          selected={selected}
          onChange={onChange}
          onClick={onClick}
          onKeyDown={onKeyDown}
          style={styles}
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
}>`
  width: 50px;
  height: 70px;
  font-size: 40px;
  margin: 0 10px;
  text-align: center;
  border: 2px solid #373737;
  border-radius: 6px;
  background-color: ${(props) => props.selected && '#fffb85'};
  caret-color: transparent;
  ::selection {
    background-color: transparent;
  }
`
const Caret = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
`
