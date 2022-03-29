import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useStore } from '../../stores/root-store/context'
import { CardSlider, SliderConfig } from '../../stores/card-slider'
import { SliderWindow } from './slider-window'

interface NewSliderConfig {
  newSliderConfig: SliderConfig
}

interface Slider {
  slider: CardSlider
}

function CardSliderComponent(
  props: React.PropsWithChildren<NewSliderConfig>
): React.ReactElement | null
function CardSliderComponent(props: React.PropsWithChildren<Slider>): React.ReactElement | null

function CardSliderComponent(props: NewSliderConfig | Slider): React.ReactElement | null {
  const { createCardSlider } = useStore()

  const isNewSlider = !('slider' in props)

  const [slider] = useState<CardSlider>(
    !isNewSlider ? props.slider : () => createCardSlider(props.newSliderConfig)
  )

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
        <RightDirectionButton onClick={slider.slideRigth} disabled={slider.page === slider.pageCount}>
          Вперёд
        </RightDirectionButton>
      )}
    </Container>
  )
}
export const Slider = observer(CardSliderComponent)

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
