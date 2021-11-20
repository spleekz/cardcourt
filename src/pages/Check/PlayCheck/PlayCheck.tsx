import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { CheckStoreContext } from '../CheckPage'

const PlayCheckContainer = styled.div`
  font-size: 30px;
`

export const PlayCheck: React.FC = observer((): JSX.Element => {
  const CheckStore = useContext(CheckStoreContext)

  const goToNextWord = () => {
    if (CheckStore.isCurrentWordBeforeLast) {
      CheckStore.currentWordIndex.set(CheckStore.currentWordIndex.value + 1)
    } else {
      CheckStore.checkMode.set('result')
      CheckStore.currentWordIndex.set(0)
    }
  }

  return (
    <PlayCheckContainer>
      {CheckStore.currentWord.en}
      <button onClick={goToNextWord}>+</button>
    </PlayCheckContainer>
  )
})
