import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useMainSlider } from '../../app'
import { SearchIcon } from '../../components/icons/search-icon'

export const Search: React.FC = observer(() => {
  const mainSlider = useMainSlider()

  const [search, setSearch] = useState<string>('')

  const setSearchToSlider = (): void => {
    mainSlider.setSearch(search)
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      setSearchToSlider()
    }
  }

  return (
    <Container>
      <Input value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={handleEnter} />
      <SearchButton onClick={setSearchToSlider}>
        <SearchIcon />
      </SearchButton>
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
const SearchButton = styled.button`
  width: 56px;
`
