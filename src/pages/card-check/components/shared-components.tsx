import React from 'react'

import styled from 'styled-components'

import { CardUI } from 'api/api'

interface ColoredCardNameProps {
  cardName: string
  cardUI: CardUI
}
export const ColoredCardName: React.FC<ColoredCardNameProps> = ({ cardName, cardUI }) => {
  return <ColoredCardNameSpan color={cardUI.wordsColor}>{cardName}</ColoredCardNameSpan>
}
const ColoredCardNameSpan = styled.span<{ color: string }>`
  color: ${(props) => props.color};
`
