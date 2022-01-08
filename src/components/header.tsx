import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Avatar } from './avatar'

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>
        <Link to='/'>cardcourt</Link>
      </HeaderTitle>
      <Avatar size={48} />
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const HeaderTitle = styled.span`
  font-family: 'Kanit', sans-serif;
  font-size: 49px;
  color: #ffffff;
`
