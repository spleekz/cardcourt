import React from 'react'

import { useMainSlider } from 'app'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Slider } from 'components/card-slider/slider'

export const Court: React.FC = observer(() => {
  const mainSlider = useMainSlider()

  return (
    <Container>
      <Link to='/card/new'>
        <CreateCardButton>Создать</CreateCardButton>
      </Link>

      <Slider slider={mainSlider} />
    </Container>
  )
})

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`
const CreateCardButton = styled.button`
  position: absolute;
  top: -30px;
  margin: 0px 0px 16px 8px;
`
