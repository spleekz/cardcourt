import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { Card } from '../../components/cards/card'
import { usePage } from '../../hooks/use-page'

export const NewCardPage: React.FC = observer(() => {
  usePage()

  return (
    <NewCardPageContainer>
      <Card type='form' />
    </NewCardPageContainer>
  )
})

const NewCardPageContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
