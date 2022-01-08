import React from 'react'
import styled from 'styled-components'
import { ICard } from '../stores/cards-store'

const Dash = styled.span``

export const WordList: React.FC<{ card: ICard }> = ({ card }) => {
  return (
    <>
      {card.wordList.map((word) => {
        return (
          <CardWordContainer key={word.id}>
            <CardWordBlock>
              <CardWord>{word.en}</CardWord>
              <Dash>—</Dash>
              <CardWord>{word.ru}</CardWord>
            </CardWordBlock>
          </CardWordContainer>
        )
      })}
    </>
  )
}

const CardWordContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 6px;
`
const CardWordBlock = styled.span`
  font-size: 32px;
  font-weight: bold;
  border-radius: 12px;
  padding: 6px;
  background: #ffffff;
`
const CardWord = styled.span`
  user-select: none;
`
