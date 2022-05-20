import React from 'react'

import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { CardSlider } from 'stores/card-slider'

import { SliderWindow } from './slider-window'

interface Props {
  slider: CardSlider
}

export const SliderComponent: React.FC<Props> = observer(({ slider }) => {
  return (
    <Container>
      {slider.cards.length > 0 && slider.pageCount === 1 ? null : (
        <LeftDirectionButton onClick={slider.slideLeft} disabled={slider.page <= 1}>
          Назад
        </LeftDirectionButton>
      )}

      <SliderWindow
        cards={slider.cards}
        cardWidth={slider.cardWidth}
        cardHeight={slider.cardHeight}
        cardsToShow={slider.cardsToShow}
        sliderPosition={slider.position}
      />

      {slider.cards.length > 0 && slider.pageCount === 1 ? null : (
        <RightDirectionButton onClick={slider.slideRigth} disabled={slider.onLastPage}>
          Вперёд
        </RightDirectionButton>
      )}
    </Container>
  )
})

const Container = styled.div`
  display: flex;
`
const DirectionButton = styled.button``
const LeftDirectionButton = styled(DirectionButton)`
  margin-right: 8px;
`
const RightDirectionButton = styled(DirectionButton)`
  margin-left: 8px;
`
