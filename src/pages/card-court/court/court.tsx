import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { CardSlider } from './card-slider'
import { useStore } from '../../../stores/root-store/context'

export const Court: React.FC = observer(() => {
  const { cardsStore } = useStore()

  const [position, setPosition] = useState<number>(0)

  const prevPage = (): void => {
    cardsStore.setPrevPage()
    setPosition((current) => current - 1682)
  }
  const nextPage = (): void => {
    cardsStore.setNextPage()
    if (!cardsStore.pageWasVisited && cardsStore.notLastPage) {
      cardsStore.loadMoreCards()
    }
    setPosition((current) => current + 1682)
  }

  useEffect(() => {
    cardsStore.loadCards(1, 2)
  }, [cardsStore.search])

  return (
    <CardListContainer>
      {cardsStore.pageCount > 1 && (
        <SliderButton onClick={prevPage} disabled={cardsStore.page <= 1}>
          Назад
        </SliderButton>
      )}
      <Link to='/card/new'>
        <CreateCardButton>Создать</CreateCardButton>
      </Link>
      <CardSlider cards={cardsStore.cards} position={position} />
      {cardsStore.pageCount > 1 && (
        <SliderButton onClick={nextPage} disabled={cardsStore.page === cardsStore.pageCount}>
          Вперёд
        </SliderButton>
      )}
    </CardListContainer>
  )
})

const CardListContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`
const CreateCardButton = styled.button`
  position: absolute;
  top: -30px;
  margin: 0px 0px 16px 8px;
`
const SliderButton = styled.button``
