import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ICard } from '../../stores/CardsStore'

interface ICardListProps {
  cardList: Array<ICard>
}

const CardListContainer = styled.div`
  display: flex;
`
const CardContainer = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 500px;
  margin: 0 8px 0 8px;
  background-color: ${(props) => props.color};
  border-radius: 16px;
  overflow: hidden;
`
const CardHeading = styled.div<{ color: string }>`
  padding: 2px 15px;
  background-color: ${(props) => props.color};
`
const CardTitle = styled.div`
  font-size: 40px;
  font-weight: bold;
`
const CardAuthor = styled.div`
  font-size: 25px;
  color: #000000a0;
`
const CardWords = styled.div<{ color: string }>`
  min-height: 502px;
  position: relative;
  top: 0;
  left: 0;
  margin-top: 10px;
  background-color: ${(props) => props.color};
  padding: 4px 15px;
  border-radius: 16px 16px 0 0;
  transition: 0.4s;
  &:hover {
    top: -90px;
  }
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
          <Link key={card.id} to={`/card/${card.id}`}>
            <CardContainer key={card.id} color={card.ui.headColor}>
              <CardHeading color={card.ui.headColor}>
                <CardTitle>{card.name}</CardTitle>
                <CardAuthor>{card.author}</CardAuthor>
              </CardHeading>
              <CardWords color={card.ui.wordListColor}>
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
          </Link>
        )
      })}
    </CardListContainer>
  )
}
