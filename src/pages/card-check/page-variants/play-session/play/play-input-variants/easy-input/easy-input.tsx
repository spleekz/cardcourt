import React, { useEffect, useRef } from 'react'

import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { CellPosition, EasyInputStore } from 'stores/card-check-store/play-session/easy-input-store'

import { useClickOutside } from 'hooks/use-click-outside'
import { usePressedKeys } from 'hooks/use-pressed-keys'
import { useShortcut } from 'hooks/use-shortcut'

import { PlayInputProps } from '../../play-input'
import { InputCell } from './input-cell'

type InputCellsRefs = Array<Array<HTMLInputElement | null>>
type AddCellRefToArrayConfig = { ref: HTMLInputElement | null; position: CellPosition }

type Props = PlayInputProps<EasyInputStore>

export const EasyPlayInput: React.FC<Props> = observer(({ inputStore, value, onKeyPress }) => {
  //!Преобразование value для отрисовки в клетках
  const valueWithoutSpaces = value.split(' ').join('')
  const valueWithoutSpacesAndSkips = Array.from({ length: valueWithoutSpaces.length }, (_, index) => {
    if (valueWithoutSpaces[index] && valueWithoutSpaces[index] !== '_') {
      return valueWithoutSpaces[index]
    }
    return ''
  })

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
    if (inputStore.currentCellPosition) {
      const { wordIndex, cellIndex } = inputStore.currentCellPosition
      inputCellsRefs.current[wordIndex][cellIndex]?.focus()
    }
  }, [inputStore.currentCellPosition])

  //!Обработка клика вне инпутов
  const inputRef = useRef<HTMLInputElement>(null)
  useClickOutside({
    ref: inputRef,
    fn: inputStore.unfocusAndUnselectCells,
  })

  //!Сочетания клавиш для выделения клеток
  const [selectAllCellsKeyDown, selectAllCellsKeyUp] = useShortcut(
    ['ControlLeft', 'KeyA'],
    inputStore.selectAllCells,
  )

  const [shiftArrowRightKeyDown, shiftArrowRightKeyUp] = useShortcut(
    ['ShiftLeft', 'ArrowRight'],
    inputStore.onShiftArrowRight,
    { repeatable: true },
  )

  const [shiftArrowLeftKeyDown, shiftArrowLeftKeyUp] = useShortcut(
    ['ShiftLeft', 'ArrowLeft'],
    inputStore.onShiftArrowLeft,
    { repeatable: true },
  )

  //!Обработчики
  const handleCellClick = (cellPosition: CellPosition): void => {
    inputStore.onCellClick(cellPosition)
  }

  const [inputPressedKeys, addInputPressedKey, deleteInputPressedKey] = usePressedKeys()

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
    addInputPressedKey(e.code)

    handleArrows(e)
    handleBackspace(e)
    handleDeleteKey(e)

    selectAllCellsKeyDown(e)
    shiftArrowRightKeyDown(e)
    shiftArrowLeftKeyDown(e)
  }
  const handleKeysUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    deleteInputPressedKey(e.code)

    selectAllCellsKeyUp(e)
    shiftArrowRightKeyUp(e)
    shiftArrowLeftKeyUp(e)
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
                  onChange={handleOnChange}
                  value={valueWithoutSpacesAndSkips[cellOrderNumber]}
                  focused={cell.focused}
                  selected={cell.selected}
                  currentSelected={inputStore.isCellCurrentSelected(cellPosition)}
                  onClick={() => handleCellClick({ wordIndex, cellIndex })}
                  onKeyPress={onKeyPress}
                  onKeyDown={handleKeysDown}
                  onKeyUp={handleKeysUp}
                />
              )
            })}
          </WordContainer>
        )
      })}
    </Container>
  )
})

const Container = styled.div`
  display: flex;
`
const WordContainer = styled.span`
  display: flex;
  margin: 0 21px;
`
