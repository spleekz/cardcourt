import React, { useEffect, useRef } from 'react'

import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { CellPosition, EasyInputStore } from 'stores/card-check-store/play-session/easy-input-store'

import { useClickOutside } from 'hooks/use-click-outside'

import { PlayInputProps } from './play-input'

type InputCellsRefs = Array<Array<HTMLInputElement | null>>
type AddCellRefToArrayConfig = { ref: HTMLInputElement | null; position: CellPosition }

type Props = PlayInputProps<EasyInputStore>

export const EasyPlayInput: React.FC<Props> = observer(({ inputStore, value, onKeyPress }) => {
  //Преобразование value для отрисовки в ячейках
  const valueWithoutSpaces = value.split(' ').join('')
  const valueWithoutSpacesAndSkips = Array.from({ length: valueWithoutSpaces.length }, (_, index) => {
    if (valueWithoutSpaces[index] && valueWithoutSpaces[index] !== '_') {
      return valueWithoutSpaces[index]
    }
    return ''
  })

  //Массив рефов инпутов
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

  //Обработка клика вне инпутов
  const inputRef = useRef<HTMLInputElement>(null)
  useClickOutside({ ref: inputRef, fn: inputStore.unfocusInput })

  //Обработчики нажатий
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
    if (e.code === 'ArrowLeft') {
      inputStore.goToPrevCell()
    }
    if (e.code === 'ArrowRight') {
      inputStore.goToNextCell()
    }
  }

  const handleKeysDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    handleArrows(e)
    handleBackspace(e)
    handleDeleteKey(e)
  }
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    inputStore.onSettingLetter(e.target.value)
  }

  //Порядковый номер ячейки
  let cellOrderNumber = -1

  return (
    <Container ref={inputRef}>
      {inputStore.words.map((word, wordIndex) => {
        return (
          <WordContainer key={wordIndex}>
            {word.map((cell, cellIndex) => {
              cellOrderNumber = cellOrderNumber + 1
              return (
                <InputCell
                  ref={(cellRef) =>
                    addCellRefToArray({ ref: cellRef, position: { wordIndex, cellIndex } })
                  }
                  key={cellIndex}
                  value={valueWithoutSpacesAndSkips[cellOrderNumber]}
                  focused={cell.focused}
                  onClick={() => inputStore.setCurrentCellPosition({ wordIndex, cellIndex })}
                  onChange={onInputChange}
                  onKeyPress={onKeyPress}
                  onKeyDown={handleKeysDown}
                />
              )
            })}
          </WordContainer>
        )
      })}
    </Container>
  )
})

const Container = styled.div``
const WordContainer = styled.span`
  margin: 0 21px;
`
const InputCell = styled.input<{ focused: boolean }>`
  width: 50px;
  height: 70px;
  font-size: 40px;
  margin: 0 10px;
  text-align: center;
  border: 2px solid #373737;
  border-radius: 6px;
  background-color: ${(props) => props.focused && '#85ffac'};
  caret-color: transparent;
`
