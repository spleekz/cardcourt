import React from 'react'
import styled from 'styled-components'
import { CardRef } from '../../components/cards/card-ref'
import { observer } from 'mobx-react-lite'
import { registerPage } from '../../hocs/register-page'

export const CardPage: React.FC = registerPage(
  observer(() => {
    return (
      <Container>
        <CardRef type='full' />
      </Container>
    )
  }),
  { isRootPath: true }
)

const Container = styled.div``
