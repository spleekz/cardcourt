import React, { useState } from 'react'

import styled from 'styled-components'

import { MeMenuPopover } from 'components/popovers/variants/me-menu'
import { Avatar } from 'components/static/avatar'

export const HeaderUserAvatar: React.FC = () => {
  const [meMenuPopoverShown, setMeMenuPopoverShown] = useState(false)

  return (
    <Container>
      <AvatarBlock onClick={() => setMeMenuPopoverShown(true)}>
        <Avatar size={48} />
      </AvatarBlock>
      <MeMenuPopover isOpened={meMenuPopoverShown} fnForClosing={() => setMeMenuPopoverShown(false)} />
    </Container>
  )
}

const Container = styled.div`
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
