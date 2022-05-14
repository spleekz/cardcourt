import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../stores/root-store/context'
import { Avatar } from '../../avatar'
import { Link } from 'react-router-dom'
import { Popover, PopoverVariantProps } from '../popover'
import { PopoverList, PopoverListItem } from '../shared-components'

export const MeMenuPopover: React.FC<PopoverVariantProps> = observer(
  ({ fnForClosing, afterClose, isOpened }) => {
    const { authStore } = useStore()

    return (
      <Popover
        width={'200px'}
        top={70}
        left={-140}
        fnForClosing={fnForClosing}
        afterClose={afterClose}
        isOpened={isOpened}
      >
        <Header>
          <Avatar size={50} />
          <UserName>{authStore.me?.name}</UserName>
        </Header>
        <Hr />
        <PopoverList>
          <PopoverListItem>
            <Link to={`/user/${authStore.me?.name}`}>Мой профиль</Link>
          </PopoverListItem>
          <PopoverListItem onClick={authStore.logout}>Выйти</PopoverListItem>
        </PopoverList>
      </Popover>
    )
  }
)

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
