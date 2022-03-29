import React from 'react'
import styled from 'styled-components'
import { Card } from '../../../api/api'

const Dash = styled.span``

export const WordList: React.FC<{ card: Card }> = ({ card }) => {
  return (
    <>
      {card.words.map((word) => {
        return (
          <Container key={word._id}>
            <WordPair>
              <Word>{word.en}</Word>
              <Dash>—</Dash>
              <Word>{word.ru}</Word>
            </WordPair>
          </Container>
        )
      })}
    </>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 6px;
`
const WordPair = styled.span`
  font-size: 32px;
  font-weight: bold;
  padding: 6px;
`
const Word = styled.span`
  user-select: none;
`
