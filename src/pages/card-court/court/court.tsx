import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { CardList } from './card-list'
import { useStore } from '../../../stores/root-store/context'

export const Court: React.FC = observer(() => {
  const { cardsStore } = useStore()

  const prevPage = (): void => {
    cardsStore.setPrevPage()
  }
  const nextPage = (): void => {
    cardsStore.loadMoreCards()
  }

  useEffect(() => {
    cardsStore.setPage(1)
    cardsStore.loadCards(cardsStore.search)
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
      <CardList cards={cardsStore.cards} />
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
