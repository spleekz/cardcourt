import React from 'react'
import styled from 'styled-components'
import { CardRef } from '../../components/cards/card-ref'
import { observer } from 'mobx-react-lite'
import { usePage } from '../../hooks/use-page'

export const CardPage: React.FC = observer(() => {
  usePage(false,true)

  return (
    <CardPageContainer>
      <CardRef type='full' />
    </CardPageContainer>
  )
})

const CardPageContainer = styled.div``
