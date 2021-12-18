import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Header: React.FC = () => {
  return (
    <Link to='/'>
      <HeaderTitle>cardcourt</HeaderTitle>
    </Link>
  )
}

const HeaderTitle = styled.span`
  font-family: 'Kanit', sans-serif;
  font-size: 49px;
  color: #ffffff;
`
