import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { CheckStoreContext } from '../page'

export const PlayCheck: React.FC = observer(() => {
  const CheckStore = useContext(CheckStoreContext)
  const [inputValue, setInputValue] = useState<string>('')

  const goToNextWord = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'Enter') {
      if (inputValue.trim().toLowerCase() === CheckStore.currentWord.en.toLowerCase()) {
        if (!CheckStore.isCurrentWordLast) {
          CheckStore.updateCurrentWordIndex()
          setInputValue('')
        } else {
          CheckStore.setCheckMode('result')
          CheckStore.setCurrentWordIndex(0)
        }
      }
    }
  }

  return (
    <Container>

      {CheckStore.currentWord.ru} -{' '}
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={goToNextWord}
      />

    </Container>
  )
})

const Container = styled.div`
  font-size: 40px;
`
const Input = styled.input`
  font-size: 40px;
`
