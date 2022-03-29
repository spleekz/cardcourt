import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { CardRef } from '../../components/cards/card-ref'
import { registerPage } from '../../hocs/register-page'

export const NewCardPage: React.FC = registerPage(
  observer(() => {
    return (
      <Container>
        <CardRef type='form' />
      </Container>
    )
  }),
  { isProtected: true }
)

const Container = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
