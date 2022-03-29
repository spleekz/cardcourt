import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useStore } from '../../stores/root-store/context'
import { Avatar } from '../avatar'

export const UserInfoPopover: React.FC = observer(() => {
  const { authStore } = useStore()

  return (
    <Container>
      <Header>
        <Avatar size={50} />
        <UserName>{authStore.me?.name}</UserName>
      </Header>
      <Hr />
      <OptionList>
        <Option>
          <Link onMouseDown={(e) => e.preventDefault()} to={`/user/${authStore.me?.name}`}>
            Мой профиль
          </Link>
        </Option>
        <Option>Мои карточки</Option>
        <Option onClick={authStore.logout}>Выйти</Option>
      </OptionList>
    </Container>
  )
})

const Container = styled.div`
  position: absolute;
  top: 70px;
  left: -140px;
  z-index: 9999;
  width: 200px;
  font-size: 18px;
  border-radius: 10px;
  background-color: #fff;
`
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
const OptionList = styled.div`
  margin: 12px 0;
`
const Option = styled.div`
  font-size: 20px;
  padding: 2px 10px;
  background-color: #fff;
  transition: background-color 0.19s;
  :hover {
    cursor: pointer;
    background-color: #f2f2f2;
  }
`
