import { makeAutoObservable } from 'mobx'

import { areSameObjects } from 'utils/objects'

type EasyInputStoreConfig = {
  initialValue: string
}

type Cell = {
  letter: string
  focused: boolean
  selected: boolean
}

export type CellPosition = {
  wordIndex: number
  cellIndex: number
}

type CellWithPosition = {
  cell: Cell
  position: CellPosition
}

type SetLetterConfig = {
  cellPosition: CellPosition
  letter: string
}

type SelectionDirection = 'left' | 'right'

export class EasyInputStore {
  constructor(config: EasyInputStoreConfig) {
    this.setEmptyCells(config.initialValue)

    makeAutoObservable(this, {}, { autoBind: true })
  }

  words: Array<Array<Cell>> = []

  //Реальное значение инпута (незаполненные буквы -> _)
  get value(): string {
    return this.words.reduce((valueAcc, wordCells, wordIndex) => {
      const fullWord = wordCells.reduce((wordAcc, letterCell) => {
        if (letterCell.letter === '') {
          return (wordAcc += '_')
        }
        return (wordAcc += letterCell.letter)
      }, '')
      //Добавление пробелов между словами
      if (wordIndex <= this.words.length - 2) {
        return (valueAcc += fullWord + ' ')
      }
      return (valueAcc += fullWord)
    }, '')
  }

  //!Вспомогательные функции
  //Получение следующей/предыдущей клетки относительно переданной позиции
  getNextCell(cellPosition: CellPosition | null): CellWithPosition | null {
    if (cellPosition) {
      const { wordIndex, cellIndex } = cellPosition
      if (!this.isLastCell(cellPosition)) {
        //Если конец слова, то перейти на первую букву следующего слова
        if (wordIndex !== this.words.length - 1 && cellIndex === this.words[wordIndex].length - 1) {
          const nextCellPosition: CellPosition = { wordIndex: wordIndex + 1, cellIndex: 0 }
          return {
            cell: this.words[nextCellPosition.wordIndex][nextCellPosition.cellIndex],
            position: nextCellPosition,
          }
        }
        //Если не конец слова, прибавить 1 к cellIndex
        const nextCellPosition: CellPosition = { wordIndex, cellIndex: cellIndex + 1 }
        return {
          cell: this.words[nextCellPosition.wordIndex][nextCellPosition.cellIndex],
          position: nextCellPosition,
        }
      }
      return null
    }
    return null
  }
  getPrevCell(cellPosition: CellPosition | null): CellWithPosition | null {
    if (cellPosition) {
      const { wordIndex, cellIndex } = cellPosition
      if (!this.isFirstCell(cellPosition)) {
        //Если начало слова, то перейти на последнюю букву предыдущего слова
        if (wordIndex !== 0 && cellIndex === 0) {
          const prevWordLastIndex = this.words[wordIndex - 1].length - 1
          const prevCellPosition: CellPosition = {
            wordIndex: wordIndex - 1,
            cellIndex: prevWordLastIndex,
          }
          return {
            cell: this.words[prevCellPosition.wordIndex][prevCellPosition.cellIndex],
            position: prevCellPosition,
          }
        }
        //Если не начало слова, то вычесть 1 из cellIndex
        const prevCellPosition: CellPosition = { wordIndex, cellIndex: cellIndex - 1 }
        return {
          cell: this.words[prevCellPosition.wordIndex][prevCellPosition.cellIndex],
          position: prevCellPosition,
        }
      }
      return null
    }
    return null
  }

  isFirstCell(cellPosition: CellPosition | null): boolean {
    return cellPosition !== null && cellPosition.wordIndex === 0 && cellPosition.cellIndex === 0
  }
  isLastCell(cellPosition: CellPosition | null): boolean {
    return (
      cellPosition !== null &&
      cellPosition.wordIndex === this.words.length - 1 &&
      cellPosition.cellIndex === this.words[cellPosition.wordIndex].length - 1
    )
  }

  isCellCurrentSelected(cellPosition: CellPosition): boolean {
    if (this.currentSelectedCellPosition) {
      return areSameObjects(cellPosition, this.currentSelectedCellPosition)
    }
    return false
  }

  //!Позиция текущей клетки
  currentCellPosition: CellPosition | null = { wordIndex: 0, cellIndex: 0 }
  setCurrentCellPosition(position: CellPosition | null): void {
    if (position === null) {
      this.currentCellPosition = null
    } else {
      if (
        position.wordIndex <= this.words.length - 1 &&
        position.cellIndex <= this.words[position.wordIndex].length - 1
      ) {
        this.currentCellPosition = position
      }
    }
  }
  setCurrentCellPositionAndFocusOnThisCell(position: CellPosition): void {
    this.setCurrentCellPosition(position)
    this.focusOnCurrentCell()
  }

  get isCurrentCellFirst(): boolean {
    return this.isFirstCell(this.currentCellPosition)
  }
  get isCurrentCellLast(): boolean {
    return this.isLastCell(this.currentCellPosition)
  }
  get cellAfterCurrent(): CellWithPosition | null {
    return this.getNextCell(this.currentCellPosition)
  }
  get cellBeforeCurrent(): CellWithPosition | null {
    return this.getPrevCell(this.currentCellPosition)
  }
  get currentLetter(): string | null {
    if (this.currentCellPosition) {
      return this.words[this.currentCellPosition.wordIndex][this.currentCellPosition.cellIndex].letter
    }
    return null
  }

  //!Фокусировка
  focusOnCurrentCell(): void {
    this.unselectAllCells()
    if (this.currentCellPosition) {
      const { wordIndex, cellIndex } = this.currentCellPosition
      this.words.forEach((word, wIndex) => {
        word.forEach((cell, cIndex) => {
          if (wIndex === wordIndex && cIndex === cellIndex) {
            cell.focused = true
          } else {
            cell.focused = false
          }
        })
      })
    }
  }
  unfocusAllCells(): void {
    this.words.forEach((word) => {
      word.forEach((cell) => {
        cell.focused = false
      })
    })
  }
  unfocusInput(): void {
    this.setCurrentCellPosition(null)
    this.unfocusAllCells()
    this.unselectAllCells()
  }

  get isInputFocused(): boolean {
    return (
      this.words.some((word) => {
        return word.some((cell) => {
          return cell.focused === true
        })
      }) || this.selectedCells.length > 0
    )
  }

  //!Установка и удаление букв
  goToNextCell(): void {
    if (this.cellAfterCurrent) {
      this.setCurrentCellPositionAndFocusOnThisCell(this.cellAfterCurrent.position)
    }
  }
  goToPrevCell(): void {
    if (this.cellBeforeCurrent) {
      this.setCurrentCellPositionAndFocusOnThisCell(this.cellBeforeCurrent.position)
    }
  }
  setLetter({ cellPosition, letter }: SetLetterConfig): void {
    this.words[cellPosition.wordIndex][cellPosition.cellIndex].letter = letter
  }
  setCurrentLetter(letter: string): void {
    if (this.currentCellPosition) {
      this.setLetter({ cellPosition: this.currentCellPosition, letter })
      this.focusOnCurrentCell()
    }
  }
  setCurrentLetterAndGoToNextCell(letter: string): void {
    this.setCurrentLetter(letter)
    this.goToNextCell()
  }
  deleteLetter(cellPosition: CellPosition): void {
    this.setLetter({ cellPosition, letter: '' })
  }
  deleteCurrentLetter(): void {
    if (this.currentCellPosition) {
      this.deleteLetter(this.currentCellPosition)
    }
  }
  deleteMultipleLetters(cellPositions: Array<CellPosition>): void {
    cellPositions.forEach((cellPosition) => {
      this.deleteLetter(cellPosition)
    })
  }

  //!Очищение инпута
  clearInput(): void {
    this.words.forEach((word) => {
      word.forEach((cell) => {
        cell.letter = ''
      })
    })
  }
  setEmptyCells(value: string): void {
    this.words = value.split(' ').map((word) => {
      return word.split('').map(() => {
        return {
          letter: '',
          focused: false,
          selected: false,
        }
      })
    })
    this.setCurrentCellPositionAndFocusOnThisCell({ wordIndex: 0, cellIndex: 0 })
  }

  //!Выделение клеток
  selectedCells: Array<CellPosition> = []

  //Показывает, в каком направлении было начато выделение
  selectionDirection: SelectionDirection | null = null
  setSelectionDirection(direction: SelectionDirection | null): void {
    this.selectionDirection = direction
  }

  get currentSelectedCellPosition(): CellPosition | null {
    return this.selectedCells[this.selectedCells.length - 1] ?? null
  }
  get currentSelectedCell(): Cell | null {
    if (this.currentSelectedCellPosition) {
      return this.words[this.currentSelectedCellPosition.wordIndex][
        this.currentSelectedCellPosition.cellIndex
      ]
    }
    return null
  }

  get firstSelectedCellPosition(): CellPosition | null {
    if (this.selectedCells.length > 0) {
      return this.selectedCells[0]
    }
    return null
  }

  get cellAfterCurrentSelected(): CellWithPosition | null {
    return this.getNextCell(this.currentSelectedCellPosition)
  }
  get cellBeforeCurrentSelected(): CellWithPosition | null {
    return this.getPrevCell(this.currentSelectedCellPosition)
  }

  selectCell(cellPosition: CellPosition): void {
    this.unfocusAllCells()
    this.words[cellPosition.wordIndex][cellPosition.cellIndex].selected = true
    this.selectedCells.push(cellPosition)
  }
  selectCurrentCell(): void {
    if (this.currentCellPosition) {
      this.selectCell(this.currentCellPosition)
    }
  }
  unselectCurrentSelectedCell(): void {
    if (this.currentSelectedCellPosition) {
      this.unfocusAllCells()
      this.words[this.currentSelectedCellPosition.wordIndex][
        this.currentSelectedCellPosition.cellIndex
      ].selected = false
      this.selectedCells.pop()
    }
  }

  startSelection({ direction }: { direction: SelectionDirection }): void {
    this.unfocusAllCells()
    this.selectCurrentCell()
    this.setSelectionDirection(direction)
  }
  endSelection(): void {
    if (this.currentSelectedCellPosition) {
      this.setCurrentCellPositionAndFocusOnThisCell(this.currentSelectedCellPosition)
      this.unselectCurrentSelectedCell()
      this.setSelectionDirection(null)
    }
  }

  selectAllCells(): void {
    this.selectedCells = []
    this.setSelectionDirection('right')
    this.setCurrentCellPosition({ wordIndex: 0, cellIndex: 0 })
    this.words.forEach((word, wordIndex) => {
      word.forEach((_, cellIndex) => {
        const cellPosition = { wordIndex, cellIndex }
        this.selectCell(cellPosition)
      })
    })
  }
  unselectAllCells(): void {
    this.selectedCells = []
    this.setSelectionDirection(null)
    this.words.forEach((word) => {
      word.forEach((cell) => {
        cell.selected = false
      })
    })
  }
  //!Обработчики
  onCellClick(cellPosition: CellPosition): void {
    this.setCurrentCellPositionAndFocusOnThisCell(cellPosition)
  }

  onChange(letter: string): void {
    if (letter !== ' ') {
      //Если есть выделенные клетки
      if (this.selectedCells.length > 0) {
        this.deleteMultipleLetters(this.selectedCells)
        this.unselectAllCells()
      }
      if (this.currentLetter === '') {
        if (this.cellAfterCurrent && this.cellAfterCurrent.cell.letter === '') {
          this.setCurrentLetterAndGoToNextCell(letter)
        } else {
          this.setCurrentLetter(letter)
        }
      }
    }
  }

  onBackspacePress(): void {
    if (this.selectedCells.length > 0) {
      this.deleteMultipleLetters(this.selectedCells)
      if (this.selectionDirection === 'right') {
        if (this.firstSelectedCellPosition) {
          this.setCurrentCellPositionAndFocusOnThisCell(this.firstSelectedCellPosition)
        }
      } else {
        if (this.currentSelectedCellPosition) {
          this.setCurrentCellPositionAndFocusOnThisCell(this.currentSelectedCellPosition)
        }
      }
    } else {
      if (this.currentLetter === '') {
        this.goToPrevCell()
      } else {
        this.deleteCurrentLetter()
      }
    }
  }
  onDeletePress(): void {
    if (this.selectedCells.length > 0) {
      this.deleteMultipleLetters(this.selectedCells)
      if (this.selectionDirection === 'right') {
        if (this.currentSelectedCellPosition) {
          this.setCurrentCellPositionAndFocusOnThisCell(this.currentSelectedCellPosition)
        }
      } else {
        if (this.firstSelectedCellPosition) {
          this.setCurrentCellPositionAndFocusOnThisCell(this.firstSelectedCellPosition)
        }
      }
    } else {
      if (this.currentLetter === '') {
        this.goToNextCell()
      } else {
        this.deleteCurrentLetter()
      }
    }
  }

  onArrowRight(): void {
    if (this.selectedCells.length === 0) {
      this.goToNextCell()
    } else {
      //Сделать текущей клеткой самую правую выделенную
      if (this.selectionDirection === 'right') {
        if (this.currentSelectedCellPosition) {
          this.setCurrentCellPositionAndFocusOnThisCell(this.currentSelectedCellPosition)
        }
      } else {
        if (this.firstSelectedCellPosition) {
          this.setCurrentCellPositionAndFocusOnThisCell(this.firstSelectedCellPosition)
        }
      }
    }
  }
  onArrowLeft(): void {
    if (this.selectedCells.length === 0) {
      this.goToPrevCell()
    } else {
      //Сфокусироваться на самой левой выделенной клетке (она уже текущая в обоих случаях)
      if (this.selectionDirection === 'right') {
        this.focusOnCurrentCell()
      } else {
        this.focusOnCurrentCell()
      }
    }
  }

  onShiftArrowRight(): void {
    //Если нет выделенных клеток
    if (this.selectedCells.length === 0) {
      this.startSelection({ direction: 'right' })
    } else {
      //Снять выделение с текущей клетки, если выделение начиналось влево
      if (this.selectionDirection === 'left') {
        if (this.selectedCells.length === 1) {
          this.endSelection()
        } else {
          this.unselectCurrentSelectedCell()
          //Обновляем текущую клетку, т.к. при выделении влево текущая клетка - последняя выделенная
          this.setCurrentCellPosition(this.currentSelectedCellPosition)
        }
      } else {
        if (this.cellAfterCurrentSelected) {
          this.selectCell(this.cellAfterCurrentSelected.position)
          //Не обновляем текущую клетку, т.к. при выделении вправо текущая клетка - та, с которой началось выделение
        }
      }
    }
  }
  onShiftArrowLeft(): void {
    //Если нет выделенных клеток
    if (this.selectedCells.length === 0) {
      this.startSelection({ direction: 'left' })
    } else {
      //Снять выделение с текущей клетки, если выделение начиналось вправо
      if (this.selectionDirection === 'right') {
        if (this.selectedCells.length === 1) {
          this.endSelection()
        } else {
          this.unselectCurrentSelectedCell()
        }
      } else {
        if (this.cellBeforeCurrentSelected) {
          this.selectCell(this.cellBeforeCurrentSelected.position)
          //Обновляем текущую клетку, т.к. при выделении влево текущая клетка - последняя выделенная
          this.setCurrentCellPosition(this.currentSelectedCellPosition)
        }
      }
    }
  }
}
