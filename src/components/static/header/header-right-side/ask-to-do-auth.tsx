import React, { useRef, useState } from 'react'

import styled from 'styled-components'

import { ChooseAuthWayPopover } from 'components/popovers/variants/choose-auth-way'

export const AskToDoAuth: React.FC = () => {
  const [waysOfAuthPopoverShown, setWaysOfAuthPopoverShown] = useState(false)

  const elementToActivateAuthWayPopover = useRef<HTMLSpanElement>(null)

  return (
    <Container>
      <DoAuthContainer
        ref={elementToActivateAuthWayPopover}
        onClick={() => {
          setWaysOfAuthPopoverShown((prev) => !prev)
        }}
      >
        Совершить акт авторизации
      </DoAuthContainer>

      <ChooseAuthWayPopover
        isOpened={waysOfAuthPopoverShown}
        fnForClosing={() => setWaysOfAuthPopoverShown(false)}
        elementForActivating={elementToActivateAuthWayPopover}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 19px;
  font-weight: bold;
`
const DoAuthContainer = styled.span`
  color: #ffffff;
  text-decoration: underline;
  user-select: none;

  &:hover {
    cursor: pointer;
  }
`
