import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { CardRef } from '../../../components/cards/card-ref'
import { Cards } from '../../../api/api'
import { useStore } from '../../../stores/root-store/context'

interface CardSliderProps {
  cards: Cards
}

export const CardSlider: React.FC<CardSliderProps> = observer(({ cards }) => {
  const { cardsSliderStore } = useStore()

  const sliderWindowRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (sliderWindowRef.current) {
      cardsSliderStore.setPixelsToSlide(sliderWindowRef.current.clientWidth)
    }
  }, [sliderWindowRef.current])

  useEffect(() => {
    cardsSliderStore.setSliderPosition((cardsSliderStore.page - 1) * cardsSliderStore.pixelsToSlide)
  }, [])

  return (
    <SliderContainer>
      {cardsSliderStore.pageCount > 1 && (
        <SliderButton onClick={cardsSliderStore.slideLeft} disabled={cardsSliderStore.page <= 1}>
          Назад
        </SliderButton>
      )}
      <SliderWindow ref={sliderWindowRef}>
        <SliderLine position={cardsSliderStore.sliderPosition}>
          {cards.map((card) => {
            return <CardRef type='element' card={card} key={card._id} />
          })}
        </SliderLine>
      </SliderWindow>
      {cardsSliderStore.pageCount > 1 && (
        <SliderButton
          onClick={cardsSliderStore.slideRigth}
          disabled={cardsSliderStore.page === cardsSliderStore.pageCount}
        >
          Вперёд
        </SliderButton>
      )}
    </SliderContainer>
  )
})

const SliderContainer = styled.div`
  display: flex;
`

const SliderWindow = styled.div`
  position: relative;
  width: 1680px;
  height: 500px;
  overflow: hidden;
`
const SliderLine = styled.div<{ position: number }>`
  display: flex;
  position: absolute;
  transform: ${(props) => `translateX(-${props.position}px)`};
  transition: 0.48s;
`
const SliderButton = styled.button`
  margin: 0 8px 0 8px;
`
