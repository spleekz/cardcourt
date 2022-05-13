import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { Search } from './search'
import { Court } from './court/court'

export const CardCourtPageOriginalContent: React.FC = observer(() => {
  return (
    <Container>
      <Search />
      <Court />
    </Container>
  )
})

const Container = styled.div`
  flex: 1 0 auto;
  position: relative;
  top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
