import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { useStore } from '../../stores/root-store/context'
import { Avatar } from '../avatar'

export const HeaderUserInfo: React.FC = observer(() => {
  const { authStore } = useStore()

  return (
    <Container>
      <LogoutButton onClick={authStore.logout}>Выйти</LogoutButton>
      <Name>{authStore.me ? authStore.me.name : 'Вход не выполнен'}</Name>
      <Avatar size={48} />
    </Container>
  )
})

const Container = styled.div`
  display: flex;
  justify-content: center;
`
const LogoutButton = styled.button`
  align-self: center;
  font-size: 21px;
  background-color: transparent;
  margin-right: 8px;
`
const Name = styled.div`
  display: flex;
  align-items: center;
  font-size: 28px;
  margin-right: 12px;
`
