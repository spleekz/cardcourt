import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ICard } from '../../stores/CardsStore'
import { observer } from 'mobx-react-lite'

interface ICardProps {
  card: ICard
}

export const CardContainer = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 0;
  left: 0;
  width: 320px;
  height: 500px;
  margin: 0 8px 0 8px;
  background-color: ${(props) => props.color};
  border-radius: 16px;
  overflow: hidden;
`
export const CardHeading = styled.div<{ color: string }>`
  padding: 2px 15px;
  background-color: ${(props) => props.color};
`
const CardName = styled.div`
  font-size: 40px;
  font-weight: bold;
`
export const CardAuthor = styled.div`
  font-size: 25px;
  color: #000000a0;
`
export const CardWords = styled.div<{ color: string; isHover: boolean }>`
  min-height: 502px;
  position: relative;
  top: 0;
  left: 0;
  margin-top: 10px;
  background-color: ${(props) => props.color};
  padding: 4px 15px;
  border-radius: 16px 16px 0 0;
  transition: 0.4s;
  :hover {
    top: ${(props) => props.isHover && '-90px'};
  }
`
const CardWordContainer = styled.div`
  display: flex;
  font-size: 30px;
`
const CardWord = styled.span``
const Dash = styled.span``

export const CardElement: React.FC<ICardProps> = observer(({ card }) => {
  return (
    <Link key={card.id} to={`/card/${card.id}`}>
      <CardContainer key={card.id} color={card.ui.headColor}>
        <CardHeading color={card.ui.headColor}>
          <CardName>{card.name}</CardName>
          <CardAuthor>{card.author}</CardAuthor>
        </CardHeading>
        <CardWords color={card.ui.wordListColor} isHover>
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
})
