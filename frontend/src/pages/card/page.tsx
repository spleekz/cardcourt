import React from 'react'
import styled from 'styled-components'
import { Card } from '../../components/cards/card'
import { observer } from 'mobx-react-lite'
import { usePage } from '../../hooks/use-page'

export const CardPage: React.FC = observer(() => {
  usePage(true)

  return (
    <CardPageContainer>
      <Card type='full' />
    </CardPageContainer>
  )
})

const CardPageContainer = styled.div``
