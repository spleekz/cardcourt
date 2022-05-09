import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useStore } from '../../../../stores/root-store/context'
import { Avatar } from '../../../avatar'
import { ListPopoverContainer, ListPopoverList, ListPopoverListItem } from '../shared-components'

export const MeMenuPopover: React.FC = () => {
  const { authStore } = useStore()

  return (
    <ListPopoverContainer width={'200px'} top={70} left={-140}>
      <Header>
        <Avatar size={50} />
        <UserName>{authStore.me?.name}</UserName>
      </Header>

      <Hr />

      <ListPopoverList>
        <ListPopoverListItem>
          <Link to={`/user/${authStore.me?.name}`}>Мой профиль</Link>
        </ListPopoverListItem>
        <ListPopoverListItem onClick={authStore.logout}>Выйти</ListPopoverListItem>
      </ListPopoverList>
    </ListPopoverContainer>
  )
}

const Header = styled.div`
  display: flex;
  padding: 11px 10px;
  align-items: center;
`
const UserName = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
`
const Hr = styled.hr`
  border: 1px solid #dddddd;
`
