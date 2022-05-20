import React from 'react'

import styled from 'styled-components'

interface InfoMessageProps {
  text: string
  fontSize?: number
}

export type InfoMessageVariantProps = Omit<InfoMessageProps, 'text'>

export const InfoMessage: React.FC<InfoMessageProps> = ({ text, fontSize }) => {
  return <Container fontSize={fontSize}>{text}</Container>
}

const Container = styled.div<{ fontSize?: number }>`
  color: #fff;
  font-size: ${(props) => `${props.fontSize ? props.fontSize : 28}px`};
  font-weight: bold;
`
