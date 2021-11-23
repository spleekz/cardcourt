import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { CheckStoreContext } from '../CheckPage'

const PlayCheckContainer = styled.div`
  font-size: 30px;
`

export const PlayCheck: React.FC = observer((): JSX.Element => {
  const CheckStore = useContext(CheckStoreContext)
  const [userInput, setUserInput] = useState<string>('')

  const goToNextWord = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'Enter') {
      if (userInput.trim().toLowerCase() === CheckStore.currentWord.ru) {
        if (CheckStore.isCurrentWordBeforeLast) {
          CheckStore.currentWordIndex.set(CheckStore.currentWordIndex.value + 1)
          setUserInput('')
        } else {
          CheckStore.checkMode.set('result')
          CheckStore.currentWordIndex.set(0)
        }
      }
    }
  }

  return (
    <PlayCheckContainer>
      {CheckStore.currentWord.en}
      <input
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={goToNextWord}
      />
    </PlayCheckContainer>
  )
})
