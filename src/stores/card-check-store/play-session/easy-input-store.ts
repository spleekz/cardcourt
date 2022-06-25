import { makeAutoObservable } from 'mobx'

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

type SetCurrentCellPositionOptions = {
  focusOnThisCell?: boolean
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

  isFirstCell(position: CellPosition | null): boolean {
    return position !== null && position.wordIndex === 0 && position.cellIndex === 0
  }
  isLastCell(position: CellPosition | null): boolean {
    return (
      position !== null &&
      position.wordIndex === this.words.length - 1 &&
      position.cellIndex === this.words[position.wordIndex].length - 1
    )
  }

  //!Позиция текущей клетки
  currentCellPosition: CellPosition | null = { wordIndex: 0, cellIndex: 0 }
  setCurrentCellPosition(
    position: CellPosition | null,
    options?: SetCurrentCellPositionOptions,
  ): void {
    if (position === null) {
      this.currentCellPosition = null
    } else {
      if (
        position.wordIndex <= this.words.length - 1 &&
        position.cellIndex <= this.words[position.wordIndex].length - 1
      ) {
        const { focusOnThisCell = true } = options ?? {}
        this.currentCellPosition = position
        if (focusOnThisCell) {
          this.focusOnCurrentCell()
        }
      }
    }
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

  //!Установка и удаление букв
  goToNextCell(): void {
    if (this.cellAfterCurrent) {
      this.setCurrentCellPosition(this.cellAfterCurrent.position)
    }
  }
  goToPrevCell(): void {
    if (this.cellBeforeCurrent) {
      this.setCurrentCellPosition(this.cellBeforeCurrent.position)
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
  unfocusInput(): void {
    this.setCurrentCellPosition(null)
    this.unfocusAllCells()
  }
  clearInput({ newValue }: { newValue: string }): void {
    this.setEmptyCells(newValue)
    this.setCurrentCellPosition({ wordIndex: 0, cellIndex: 0 })
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
    this.focusOnCurrentCell()
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

  selectAllCells(): void {
    this.selectedCells = []
    this.setSelectionDirection('right')
    this.setCurrentCellPosition({ wordIndex: 0, cellIndex: 0 }, { focusOnThisCell: false })
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
  unfocusAndUnselectCells(): void {
    this.unfocusAllCells()
    this.unselectAllCells()
  }

  //!Обработчики
  onKeyPress(letter: string): void {
    if (letter !== ' ') {
      //Если есть выделенные клетки
      if (this.selectedCells.length > 0) {
        this.selectedCells.forEach((selectedCellPosition) => {
          this.deleteLetter(selectedCellPosition)
        })
        this.unselectAllCells()
      }

      if (this.cellAfterCurrent && this.cellAfterCurrent.cell.letter === '') {
        this.setCurrentLetterAndGoToNextCell(letter)
      } else {
        this.setCurrentLetter(letter)
      }
    }
  }

  onBackspacePress(): void {
    if (this.selectedCells.length > 0) {
      this.deleteMultipleLetters(this.selectedCells)
      this.unselectAllCells()
      this.focusOnCurrentCell()
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
      this.unselectAllCells()
      this.focusOnCurrentCell()
    } else {
      if (this.currentLetter === '') {
        this.goToNextCell()
      } else {
        this.deleteCurrentLetter()
      }
    }
  }

  onArrowRight(): void {
    if (this.currentSelectedCellPosition) {
      //Поставить курсор на последнюю выделенную клетку
      this.setCurrentCellPosition(this.currentSelectedCellPosition)
    } else {
      this.goToNextCell()
    }
  }
  onArrowLeft(): void {
    if (this.currentSelectedCellPosition) {
      //Поставить курсор на последнюю выделенную клетку
      this.setCurrentCellPosition(this.currentSelectedCellPosition)
    } else {
      this.goToPrevCell()
    }
  }

  onShiftArrowRight(): void {
    if (this.selectedCells.length === 0 && !this.isCurrentCellLast) {
      this.selectCurrentCell()
      this.setSelectionDirection('right')
    } else {
      if (this.cellAfterCurrentSelected) {
        //Снимаем выделение с текущей клетки, если клетки выделялись влево
        if (this.selectionDirection === 'left') {
          this.unselectCurrentSelectedCell()
          //Т.к при выделении влево текущей клеткой становится последняя выделенная
          this.setCurrentCellPosition(this.currentSelectedCellPosition, { focusOnThisCell: false })
        } else {
          //При выделении вправо текущей клеткой становится та, с которой началось выделение
          this.selectCell(this.cellAfterCurrentSelected.position)
        }
      }
    }
  }
  onShiftArrowLeft(): void {
    if (this.selectedCells.length === 0 && !this.isCurrentCellFirst) {
      this.selectCurrentCell()
      this.setSelectionDirection('left')
    } else {
      if (this.cellBeforeCurrentSelected) {
        //Снимаем выделение с текущей клетки, если клетки выделялись вправо
        if (this.selectionDirection === 'right') {
          this.unselectCurrentSelectedCell()
        } else {
          this.selectCell(this.cellBeforeCurrentSelected.position)
          //При выделении влево текущей клеткой становится последняя выделенная
          this.setCurrentCellPosition(this.currentSelectedCellPosition, { focusOnThisCell: false })
        }
      }
    }
  }
}
