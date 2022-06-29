import React, { useRef, useState } from 'react'

import styled from 'styled-components'

import { MeMenuPopover } from 'components/popovers/variants/me-menu'
import { Avatar } from 'components/static/avatar'

export const HeaderUserAvatar: React.FC = () => {
  const [meMenuPopoverShown, setMeMenuPopoverShown] = useState(false)
  const elementToActivateMeMenuPopover = useRef<HTMLDivElement>(null)

  return (
    <Container>
      <AvatarBlock
        ref={elementToActivateMeMenuPopover}
        onClick={() => setMeMenuPopoverShown((prev) => !prev)}
      >
        <Avatar size={48} />
      </AvatarBlock>
      <MeMenuPopover
        isOpened={meMenuPopoverShown}
        fnForClosing={() => setMeMenuPopoverShown(false)}
        elementForActivating={elementToActivateMeMenuPopover}
      />
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
