import React, { CSSProperties, useEffect, useRef } from 'react'

import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import {
  CellPosition,
  CelledInputStore,
} from 'stores/card-check-store/play-session/celled-input-store'

import { useClickOutside } from 'hooks/use-click-outside'
import { usePressedKeys } from 'hooks/use-pressed-keys'
import { useShortcut } from 'hooks/use-shortcut'

import { InputCell } from './input-cell'

type InputCellsRefs = Array<Array<HTMLInputElement | null>>
type AddCellRefToArrayConfig = { ref: HTMLInputElement | null; position: CellPosition }

type Props = {
  inputStore: CelledInputStore
  readonly?: boolean
  value: string
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  styles?: CSSProperties
}

export const CelledPlayInput: React.FC<Props> = observer(
  ({ inputStore, readonly, value, styles, ...props }) => {
    const customOnKeyDown = props.onKeyDown

    //!Преобразование value для отрисовки в клетках
    const valueWithoutSpaces = value.split(' ').join('')
    const valueWithoutSpacesAndSkips = Array.from(
      { length: valueWithoutSpaces.length },
      (_, index) => {
        if (valueWithoutSpaces[index] && valueWithoutSpaces[index] !== '_') {
          return valueWithoutSpaces[index]
        }
        return ''
      },
    )

    //!Массив рефов инпутов
    const inputCellsRefs = useRef<InputCellsRefs>([])

    const addCellRefToArray = ({ ref, position }: AddCellRefToArrayConfig): void => {
      const { wordIndex, cellIndex } = position
      if (position.wordIndex === 0 && position.cellIndex === 0) {
        inputCellsRefs.current = Array.from({ length: inputStore.words.length }, () => [])
      }
      inputCellsRefs.current[wordIndex][cellIndex] = ref
    }

    useEffect(() => {
      if (inputStore.isInputFocused) {
        if (inputStore.currentCellPosition) {
          const { wordIndex, cellIndex } = inputStore.currentCellPosition
          inputCellsRefs.current[wordIndex][cellIndex]?.focus()
        }
      } else {
        inputCellsRefs.current.forEach((word) => {
          word.forEach((cell) => {
            cell?.blur()
          })
        })
      }
    }, [inputStore.isInputFocused])

    //!Обработка клика вне инпутов
    const inputRef = useRef<HTMLInputElement>(null)
    useClickOutside({
      ref: inputRef,
      fn: inputStore.unfocusInput,
    })

    //!Сочетания клавиш для выделения клеток
    useShortcut(inputRef, ['ControlLeft', 'KeyA'], inputStore.selectAllCells)

    useShortcut(inputRef, ['ShiftLeft', 'ArrowRight'], inputStore.onShiftArrowRight, {
      repeatable: true,
    })

    useShortcut(inputRef, ['ShiftLeft', 'ArrowLeft'], inputStore.onShiftArrowLeft, {
      repeatable: true,
    })

    //!Обработчики
    const inputPressedKeys = usePressedKeys(inputRef)

    const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.code === 'Backspace') {
        e.preventDefault()
        inputStore.onBackspacePress()
      }
    }
    const handleDeleteKey = (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.code === 'Delete') {
        e.preventDefault()
        inputStore.onDeletePress()
      }
    }
    const handleArrows = (e: React.KeyboardEvent<HTMLInputElement>): void => {
      //Если нажаты ТОЛЬКО стрелки (не в сочетании с другими клавишами)
      if (inputPressedKeys.size === 1) {
        if (e.code === 'ArrowLeft') {
          inputStore.onArrowLeft()
        }
        if (e.code === 'ArrowRight') {
          inputStore.onArrowRight()
        }
      }
    }
    const handleKeysDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
      customOnKeyDown?.(e)

      handleArrows(e)
      handleBackspace(e)
      handleDeleteKey(e)
    }
    const handleCellClick = (cellPosition: CellPosition): void => {
      if (!readonly) {
        inputStore.onCellClick(cellPosition)
      }
    }
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { data } = e.nativeEvent as InputEvent
      inputStore.onChange(data!)
    }

    //Порядковый номер клетки
    let cellOrderNumber = -1

    return (
      <Container ref={inputRef}>
        {inputStore.words.map((word, wordIndex) => {
          return (
            <WordContainer key={wordIndex}>
              {word.map((cell, cellIndex) => {
                const cellPosition: CellPosition = { wordIndex, cellIndex }
                cellOrderNumber = cellOrderNumber + 1
                return (
                  <InputCell
                    ref={(cellRef) => {
                      addCellRefToArray({ ref: cellRef, position: cellPosition })
                    }}
                    key={cellIndex}
                    readonly={readonly}
                    value={valueWithoutSpacesAndSkips[cellOrderNumber]}
                    focused={cell.focused}
                    selected={cell.selected}
                    currentSelected={inputStore.isCellCurrentSelected(cellPosition)}
                    onChange={handleOnChange}
                    onClick={() => handleCellClick({ wordIndex, cellIndex })}
                    onKeyDown={handleKeysDown}
                    styles={styles}
                  />
                )
              })}
            </WordContainer>
          )
        })}
      </Container>
    )
  },
)

const Container = styled.div`
  display: flex;
`
const WordContainer = styled.span`
  display: flex;
  margin: 0 21px;
`
