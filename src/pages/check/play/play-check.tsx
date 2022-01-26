import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { CheckStoreContext } from '../page'

export const PlayCheck: React.FC = observer(() => {
  const CheckStore = useContext(CheckStoreContext)
  const [userInputValue, setUserInputValue] = useState<string>('')

  const goToNextWord = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'Enter') {
      if (userInputValue.trim().toLowerCase() === CheckStore.currentWord.en.toLowerCase()) {
        if (!CheckStore.isCurrentWordLast) {
          CheckStore.updateCurrentWordIndex()
          setUserInputValue('')
        } else {
          CheckStore.setCheckMode('result')
          CheckStore.setCurrentWordIndex(0)
        }
      }
    }
  }

  return (
    <PlayCheckContainer>
      {CheckStore.currentWord.ru} -{' '}
      <UserInput
        value={userInputValue}
        onChange={(e) => setUserInputValue(e.target.value)}
        onKeyPress={goToNextWord}
      />
    </PlayCheckContainer>
  )
})

const PlayCheckContainer = styled.div`
  font-size: 40px;
`
const UserInput = styled.input`
  font-size: 40px;
`
