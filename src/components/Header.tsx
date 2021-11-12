import React, { FC } from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.div`
  padding: 0 15px;
`
const HeaderTitle = styled.span`
  font-family: 'Kanit', sans-serif;
  font-size: 49px;
  color: #ffffff;
`

export const Header: FC = (): JSX.Element => {
  return (
    <HeaderContainer>
      <HeaderTitle>cardcourt</HeaderTitle>
    </HeaderContainer>
  )
}
