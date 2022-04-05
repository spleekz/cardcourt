import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { HeaderUserInfo } from './header-user-info'

export const Header: React.FC = observer(() => {
  return (
    <Container>

      <Title>
        <Link to='/'>cardcourt</Link>
      </Title>

      <HeaderUserInfo />

    </Container>
  )
})

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`
const Title = styled.span`
  font-family: 'Kanit', sans-serif;
  font-size: 49px;
  color: #ffffff;
`
