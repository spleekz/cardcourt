import React from 'react'
import styled from 'styled-components'

const HeaderTitle = styled.span`
  font-family: 'Kanit', sans-serif;
  font-size: 49px;
  color: #ffffff;
`

export const Header: React.FC = () => {
  return <HeaderTitle>cardcourt</HeaderTitle>
}
