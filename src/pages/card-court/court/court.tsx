import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { CardSlider } from '../../../components/card-slider'
import { useStore } from '../../../stores/root-store/context'
import { useMainSlider } from '../../../app'

export const Court: React.FC = observer(() => {
  const { cardsStore } = useStore()
  const mainSlider = useMainSlider()

  useEffect(() => {
    if (!cardsStore.cards.length) {
      mainSlider.initializeSlider()
    }
  }, [])

  return (
    <CardListContainer>
      <Link to='/card/new'>
        <CreateCardButton>Создать</CreateCardButton>
      </Link>
      <CardSlider slider={mainSlider} />
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
