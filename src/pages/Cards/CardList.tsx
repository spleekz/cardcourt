import React, { FC } from 'react'
import styled from 'styled-components'
import { ICard } from '../../stores/CardsStore'

interface ICardListProps {
  cardList: Array<ICard>
}

const CardListContainer = styled.div`
  display: flex;
  padding: 16px;
`
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 500px;
  margin: 0 8px 0 8px;
  background-color: #aefff8;
  border-radius: 16px;
  overflow: hidden;
`
const CardHeading = styled.div`
  padding: 2px 15px;
`
const CardTitle = styled.div`
  font-size: 40px;
  font-weight: bold;
`
const CardAuthor = styled.div`
  font-size: 25px;
  color: #000000a0;
`
const CardWords = styled.div`
  min-height: 500px;
  position: relative;
  top: 0;
  left: 0;
  margin-top: 10px;
  background-color: #f7f7f7;
  padding: 4px 15px;
  border-radius: 16px 16px 0 0;
`
const CardWordContainer = styled.div`
  display: flex;
  font-size: 30px;
`
const CardWord = styled.span``
const Dash = styled.span``

export const CardList: FC<ICardListProps> = ({ cardList }): JSX.Element => {
  return (
    <CardListContainer>
      {cardList.map((card) => {
        return (
          <CardContainer key={card.id}>
            <CardHeading>
              <CardTitle>{card.name}</CardTitle>
              <CardAuthor>{card.author}</CardAuthor>
            </CardHeading>
            <CardWords>
              {card.wordList.map((word) => {
                return (
                  <CardWordContainer key={word.id}>
                    <CardWord>{word.en}</CardWord>
                    <Dash>—</Dash>
                    <CardWord>{word.ru}</CardWord>
                  </CardWordContainer>
                )
              })}
            </CardWords>
          </CardContainer>
        )
      })}
    </CardListContainer>
  )
}
