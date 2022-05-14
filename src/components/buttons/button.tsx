import React from 'react'
import styled from 'styled-components'

interface Props {
  background: string
}

export const Button: React.FC<Props> = ({ background, children }) => {
  return <StyledButton background={background}>{children}</StyledButton>
}

const StyledButton = styled.div<Props>`
  background-color: ${(props) => props.background};
  padding: 10px;
  font-size: 32px;
  color: #ffffff;
`
