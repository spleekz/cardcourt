import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { CardRef } from '../../../components/cards/card-ref'
import { Card } from '../../../api/api'
import { useStore } from '../../../stores/root-store/context'

interface CardSliderProps {
  cards: Array<Card>
}

export const CardSlider: React.FC<CardSliderProps> = observer(({ cards }) => {
  const { cardsStore, cardsSliderStore } = useStore()
  const [sliderWidth, setSliderWidth] = useState<number>(0)

  const [position, setPosition] = useState<number>(0)

  const sliderWindowRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (sliderWindowRef.current) {
      setSliderWidth(sliderWindowRef.current.clientWidth)
    }
  }, [sliderWindowRef.current])

  const prevPage = (): void => {
    cardsSliderStore.setPrevPage()
    setPosition((current) => current - sliderWidth)
  }
  const nextPage = (): void => {
    cardsSliderStore.setNextPage()
    if (!cardsSliderStore.pageWasVisited) {
      cardsSliderStore.updateMaxVisitedPage()
      if (!cardsSliderStore.allPagesAreLoaded) {
        cardsStore.loadMoreCards({ pagesToLoad: 2 })
      }
    }
    setPosition((current) => current + sliderWidth)
  }

  useEffect(() => {
    setPosition((cardsSliderStore.page - 1) * 1680)
  }, [])

  return (
    <SliderContainer>
      {cardsSliderStore.pageCount > 1 && (
        <SliderButton onClick={prevPage} disabled={cardsSliderStore.page <= 1}>
          Назад
        </SliderButton>
      )}
      <SliderWindow ref={sliderWindowRef}>
        <SliderLine position={position}>
          {cards.map((card) => {
            return <CardRef type='element' card={card} key={card._id} />
          })}
        </SliderLine>
      </SliderWindow>
      {cardsSliderStore.pageCount > 1 && (
        <SliderButton
          onClick={nextPage}
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
