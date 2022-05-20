import React, { useState } from 'react'

import { observer } from 'mobx-react-lite'
import { Search as SearchIcon } from 'react-bootstrap-icons'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

export const Search: React.FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState<string>(searchParams.get('query') || '')

  const setSearchToUrl = (): void => {
    const trimmedSearch = search.trim()
    if (trimmedSearch !== '') {
      setSearchParams({ query: trimmedSearch })
    }
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      setSearchToUrl()
    }
  }

  return (
    <Container>
      <Input value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={handleEnter} />

      <SearchButton onClick={setSearchToUrl}>
        <SearchIcon size={22} />
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
