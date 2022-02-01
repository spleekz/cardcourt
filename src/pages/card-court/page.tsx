import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { registerPage } from '../../hocs/register-page'
import { Search } from './search'
import { Court } from './court/court'

export const CardCourtPage: React.FC = registerPage(
  observer(() => {
    return (
      <CardsPageContainer>
        <Search />
        <Court />
      </CardsPageContainer>
    )
  })
)

const CardsPageContainer = styled.div`
  flex: 1 0 auto;
  position: relative;
  top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
