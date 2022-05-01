import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useStore } from '../../stores/root-store/context'
import { Avatar } from '../avatar'
import { UserInfoPopover } from './user-info-popover'

export const HeaderUserInfo: React.FC = observer(() => {
  const { authStore } = useStore()
  const [isUserPopover, setIsUserPopover] = useState(false)

  const location = useLocation()

  useEffect(() => {
    if (!authStore.token) {
      setIsUserPopover(false)
    }
  }, [authStore.token])

  useEffect(() => {
    setIsUserPopover(false)
  }, [location.key])

  return (
    <Container>
      {authStore.token ? (
        <UserBlock tabIndex={1} onBlur={() => setIsUserPopover(false)}>
          <AvatarBlock onClick={() => setIsUserPopover(!isUserPopover)}>
            <Avatar size={48} />
          </AvatarBlock>
          {isUserPopover && <UserInfoPopover />}
        </UserBlock>
      ) : (
        <>
          Вы не авторизованы! <Link to='/auth'>Авторизация</Link>
        </>
      )}
    </Container>
  )
})

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`
const UserBlock = styled.div`
  display: flex;
`
const AvatarBlock = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`
