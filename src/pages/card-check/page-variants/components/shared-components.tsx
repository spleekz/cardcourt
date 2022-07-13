import React from 'react'

import { ArrowLeft } from 'react-bootstrap-icons'
import styled from 'styled-components'

import { CardUI } from 'api/api'

type ColoredCardNameProps = {
  cardName: string
  cardUI: CardUI
}
export const ColoredCardName: React.FC<ColoredCardNameProps> = ({ cardName, cardUI }) => {
  return <ColoredCardNameSpan color={cardUI.wordsColor}>{cardName}</ColoredCardNameSpan>
}
const ColoredCardNameSpan = styled.span<{ color: string }>`
  color: ${(props) => props.color};
`

type ButtonWithArrowLeftProps = {
  onClick?: () => void
  title: string
}
export const ButtonWithArrowLeft: React.FC<ButtonWithArrowLeftProps> = ({ onClick, title }) => {
  return (
    <StyledButtonWithArrowLeft title={title} onClick={onClick}>
      <ArrowLeft size={35} />
    </StyledButtonWithArrowLeft>
  )
}

const StyledButtonWithArrowLeft = styled.button`
  border-radius: 6px;
  padding: 6px;
  background-color: transparent;
  transition: 0.2s;
  &:hover {
    background-color: #e3e3e3;
  }
  &:active {
    background-color: #d4d4d4;
  }
`
