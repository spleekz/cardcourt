import React from 'react'
import styled from 'styled-components'
import { Card } from '../api/api'

const Dash = styled.span``

export const WordList: React.FC<{ card: Card }> = ({ card }) => {
  return (
    <>
      {card.words.map((word) => {
        return (
          <CardWordContainer key={word._id}>
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
  padding: 6px;
`
const CardWord = styled.span`
  user-select: none;
`
