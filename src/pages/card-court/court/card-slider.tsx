import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { CardRef } from '../../../components/cards/card-ref'
import { Card } from '../../../api/api'

interface CardSliderProps {
  cards: Array<Card>
  position: number
}

export const CardSlider: React.FC<CardSliderProps> = observer(({ cards, position }) => {
  return (
    <SliderContainer>
      <SliderLine position={position}>
        {cards.map((card) => {
          return <CardRef type='element' card={card} key={card._id} />
        })}
      </SliderLine>
    </SliderContainer>
  )
})

const SliderContainer = styled.div`
  position: relative;
  width: 1682px;
  height: 500px;
  overflow: hidden;
`
const SliderLine = styled.div<{ position: number }>`
  display: flex;
  position: absolute;
  transform: ${(props) => `translateX(-${props.position}px)`};
  transition: 0.48s;
`
