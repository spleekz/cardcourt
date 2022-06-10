import React from 'react'

import styled from 'styled-components'

import { Card } from 'api/api'

interface ColoredCardNameProps {
  card: Card
}
export const ColoredCardName: React.FC<ColoredCardNameProps> = ({ card }) => {
  return <ColoredCardNameSpan color={card.ui.wordsColor}>{card.name}</ColoredCardNameSpan>
}
const ColoredCardNameSpan = styled.span<{ color: string }>`
  color: ${(props) => props.color};
`
