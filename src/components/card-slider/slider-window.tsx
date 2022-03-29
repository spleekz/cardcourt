import React from 'react'
import styled from 'styled-components'
import { Cards } from '../../api/api'
import { CardRef } from '../cards/card-ref'

interface Props {
  cards: Cards
  cardWidth: number
  cardHeight: number
  cardsToShow: number
  sliderPosition: number
}

export const SliderWindow: React.FC<Props> = ({
  cards,
  cardWidth,
  cardHeight,
  cardsToShow,
  sliderPosition,
}) => {
  return (
    <Window cardWidth={cardWidth} cardHeight={cardHeight} cardsToShow={cardsToShow}>
      <SliderLine position={sliderPosition}>
        {cards.map((card) => {
          return (
            <CardRef type='element' card={card} width={cardWidth} height={cardHeight} key={card._id} />
          )
        })}
      </SliderLine>
    </Window>
  )
}

const Window = styled.div<{ cardWidth: number; cardHeight: number; cardsToShow: number }>`
  position: relative;
  width: ${(props) => `${props.cardWidth * props.cardsToShow + 8 * 2 * props.cardsToShow}px`};
  height: ${(props) => `${props.cardHeight}px`};
  border-radius: 16px;
  overflow: hidden;
`
const SliderLine = styled.div<{ position: number }>`
  display: flex;
  position: absolute;
  transform: ${(props) => `translateX(-${props.position}px)`};
  transition: 0.48s ease-out;
`
