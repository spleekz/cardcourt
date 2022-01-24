import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { CardRef } from '../../components/cards/card-ref'
import { usePage } from '../../hooks/use-page'

export const NewCardPage: React.FC = observer(() => {
  usePage(true)

  return (
    <NewCardPageContainer>
      <CardRef type='form' />
    </NewCardPageContainer>
  )
})

const NewCardPageContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
