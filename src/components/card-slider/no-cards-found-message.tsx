import React from 'react'
import styled from 'styled-components'

export const NoCardsFoundMessage: React.FC<{ search: string }> = ({ search }) => {
  return (
    <Container>
      {search === '' ? (
        <>Карточки не найдены</>
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
