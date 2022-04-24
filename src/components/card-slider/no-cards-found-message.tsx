import React from 'react'
import styled from 'styled-components'

export const NoCardsFoundMessage: React.FC<{ search: string; by: string }> = ({ search, by }) => {
  const searchingAllCards = search === '' && by === ''

  return (
    <Container>
      {searchingAllCards ? (
        <>Пусто. Никто не хочет создавать карточки :(</>
      ) : (
        <>
          По запросу &quot;<Bold>{search}</Bold>&quot; не найдено карточек
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
  font-size: 40px;
  color: #ffffff;
`
const Bold = styled.span`
  font-weight: bold;
`
