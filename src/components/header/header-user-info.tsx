import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useStore } from '../../stores/root-store/context'
import { Avatar } from '../avatar'
import { MeMenuPopover } from '../popovers/list-popover/variants/me-menu'

export const HeaderUserInfo: React.FC = observer(() => {
  const { appStore, authStore } = useStore()
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
          {isUserPopover && <MeMenuPopover />}
        </UserBlock>
      ) : (
        !appStore.onAuthPage && (
          <>
            Вы не авторизованы! <Link to='/login'>Авторизация</Link>
          </>
        )
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
