import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import styled from 'styled-components'
import { CardRef } from '../../../components/cards/card-ref'
import { Card } from '../../../api/api'
import { useStore } from '../../../stores/root-store/context'

interface CardSliderProps {
  cards: Array<Card>
}

export const CardSlider: React.FC<CardSliderProps> = observer(({ cards }) => {
  const { cardsStore, cardsPaginationStore } = useStore()

  const [position, setPosition] = useState<number>(0)

  const prevPage = (): void => {
    cardsPaginationStore.setPrevPage()
    setPosition((current) => current - 1680)
  }
  const nextPage = (): void => {
    cardsPaginationStore.setNextPage()
    if (!cardsPaginationStore.pageWasVisited) {
      cardsPaginationStore.updateMaxVisitedPage()
      if (!cardsPaginationStore.allPagesAreLoaded) {
        cardsStore.loadMoreCards({ pagesToLoad: 2 })
      }
    }
    setPosition((current) => current + 1680)
  }

  return (
    <SliderContainer>
      {cardsPaginationStore.pageCount > 1 && (
        <SliderButton onClick={prevPage} disabled={cardsPaginationStore.page <= 1}>
          Назад
        </SliderButton>
      )}
      <SliderWindow>
        <SliderLine position={position}>
          {cards.map((card) => {
            return <CardRef type='element' card={card} key={card._id} />
          })}
        </SliderLine>
      </SliderWindow>
      {cardsPaginationStore.pageCount > 1 && (
        <SliderButton
          onClick={nextPage}
          disabled={cardsPaginationStore.page === cardsPaginationStore.pageCount}
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
