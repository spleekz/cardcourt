import { makeAutoObservable } from 'mobx'

type EasyInputStoreConfig = {
  initialValue: string
}

type Cell = {
  letter: string
  focused: boolean
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

export class EasyInputStore {
  constructor(config: EasyInputStoreConfig) {
    this.setEmptyCells(config.initialValue)

    makeAutoObservable(this, {}, { autoBind: true })
  }

  words: Array<Array<Cell>> = []

  setEmptyCells(value: string): void {
    this.words = value.split(' ').map((word) => {
      return word.split('').map(() => {
        return {
          letter: '',
          focused: false,
        }
      })
    })
    if (this.currentCellPosition) {
      this.focusOnCurrentCell()
    }
  }

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
        this.focusOnCurrentCell()
      }
    }
  }

  focusOnCurrentCell(): void {
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
  }
  clearInput({ newValue }: { newValue: string }): void {
    this.setEmptyCells(newValue)
    this.setCurrentCellPosition({ wordIndex: 0, cellIndex: 0 })
  }

  get isFirstCell(): boolean {
    return (
      this.currentCellPosition !== null &&
      this.currentCellPosition.wordIndex === 0 &&
      this.currentCellPosition.cellIndex === 0
    )
  }
  get isLastCell(): boolean {
    return (
      this.currentCellPosition !== null &&
      this.currentCellPosition.wordIndex === this.words.length - 1 &&
      this.currentCellPosition.cellIndex === this.words[this.currentCellPosition.wordIndex].length - 1
    )
  }

  get nextCell(): CellWithPosition | null {
    if (this.currentCellPosition) {
      const { wordIndex, cellIndex } = this.currentCellPosition
      if (!this.isLastCell) {
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
  get prevCell(): CellWithPosition | null {
    if (this.currentCellPosition) {
      const { wordIndex, cellIndex } = this.currentCellPosition
      if (!this.isFirstCell) {
        //Если начало слова, то перейти на последнюю букву предыдущего слова
        if (wordIndex !== 0 && cellIndex === 0) {
          const prevWordLastIndex = this.words[wordIndex - 1].length - 1
          const prevCellPosition: CellPosition = {
            wordIndex: wordIndex - 1,
            cellIndex: prevWordLastIndex,
          }
          return {
            cell: this.words[prevCellPosition.wordIndex][prevCellPosition.wordIndex],
            position: prevCellPosition,
          }
        }
        //Если не начало слова, то вычесть 1 из cellIndex
        const prevCellPosition: CellPosition = { wordIndex, cellIndex: cellIndex - 1 }
        return {
          cell: this.words[prevCellPosition.wordIndex][prevCellPosition.wordIndex],
          position: prevCellPosition,
        }
      }
      return null
    }
    return null
  }

  get currentLetter(): string | null {
    if (this.currentCellPosition) {
      return this.words[this.currentCellPosition.wordIndex][this.currentCellPosition.cellIndex].letter
    }
    return null
  }

  goToNextCell(): void {
    if (this.nextCell) {
      this.setCurrentCellPosition(this.nextCell.position)
    }
  }
  goToPrevCell(): void {
    if (this.prevCell) {
      this.setCurrentCellPosition(this.prevCell.position)
    }
  }

  setLetter({ cellPosition, letter }: SetLetterConfig): void {
    this.words[cellPosition.wordIndex][cellPosition.cellIndex].letter = letter
  }
  setCurrentLetter(letter: string): void {
    if (this.currentCellPosition) {
      this.setLetter({ cellPosition: this.currentCellPosition, letter })
    }
  }
  setCurrentLetterAndGoToNextCell(letter: string): void {
    this.setCurrentLetter(letter)
    this.goToNextCell()
  }
  deleteCurrentLetter(): void {
    if (this.currentCellPosition) {
      this.setLetter({ cellPosition: this.currentCellPosition, letter: '' })
    }
  }

  onBackspacePress(): void {
    if (this.currentLetter === '') {
      this.goToPrevCell()
    } else {
      this.deleteCurrentLetter()
    }
  }
  onDeletePress(): void {
    if (this.currentLetter === '') {
      this.goToNextCell()
    } else {
      this.deleteCurrentLetter()
    }
  }
  onSettingLetter(letter: string): void {
    //Игнорировать, если в этой ячейке уже есть буква
    if (!this.currentLetter && letter !== ' ') {
      if (this.nextCell && this.nextCell.cell.letter === '') {
        this.setCurrentLetterAndGoToNextCell(letter)
      } else {
        this.setCurrentLetter(letter)
      }
    }
  }

  //Реальное значение инпута (незаполненные буквы -> _)
  get value(): string {
    return this.words.reduce((valueAcc, wordCells, index) => {
      const fullWord = wordCells.reduce((wordAcc, letterCell) => {
        if (letterCell.letter === '') {
          return (wordAcc += '_')
        }
        return (wordAcc += letterCell.letter)
      }, '')
      //Добавление пробелов между словами
      if (index < this.words.length) {
        return (valueAcc += fullWord + ' ')
      }
      return (valueAcc += fullWord)
    }, '')
  }
}
