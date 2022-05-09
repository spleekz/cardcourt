import React, { useState } from 'react'
import styled from 'styled-components'
import { ChooseAuthWayPopup } from '../../../popovers/variants/choose-auth-way'

export const AskToDoAuth: React.FC = () => {
  const [waysOfAuthPopoverShown, setWaysOfAuthPopoverShown] = useState(false)

  return (
    <Container>
      <DoAuthContainer onClick={() => setWaysOfAuthPopoverShown(true)}>
        Совершить акт авторизации
      </DoAuthContainer>
      {waysOfAuthPopoverShown && (
        <ChooseAuthWayPopup onClose={() => setWaysOfAuthPopoverShown(false)} />
      )}
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
