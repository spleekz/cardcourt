import debounce from 'lodash.debounce'
import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { useStore } from '../../stores/root-store/context'

export const Search: React.FC = observer(() => {
  const { cardsSliderStore } = useStore()

  const debouncedInitializeSlider = debounce(cardsSliderStore.initializeSlider, 350)

  const setSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    cardsSliderStore.setSearch(e.target.value)
    debouncedInitializeSlider()
  }

  return (
    <Container>
      <Input value={cardsSliderStore.search} onChange={setSearch} />
      <Button>карточки</Button>
      <Button>авторы</Button>
    </Container>
  )
})

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50px;
  margin: 0 auto;
  width: 100%;
  padding: 10px;
`

const Input = styled.input`
  font-size: 40px;
`
const Button = styled.button`
  width: 110px;
  height: 50px; ;
`
