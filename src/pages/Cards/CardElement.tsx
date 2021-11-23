import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ICard } from '../../stores/CardsStore'
import { observer } from 'mobx-react-lite'

interface ICardProps {
  card: ICard
}

const CardContainer = styled.div<{ color: string }>`
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
const CardWords = styled.div<{ color: string; positionTop: number }>`
  min-height: 502px;
  position: relative;
  top: ${(props) => props.positionTop + 'px'};
  left: 0;
  margin-top: 10px;
  background-color: ${(props) => props.color};
  padding: 4px 15px;
  border-radius: 16px 16px 0 0;
  transition: 0.4s;
`
const CardWordContainer = styled.div`
  display: flex;
  font-size: 30px;
`
const CardWord = styled.span``
const Dash = styled.span``
const PlaceForCursor = styled.div`
  position: absolute;
  top: 100px;
  left: 15px;
  z-index: 1000;
  width: 90%;
  height: 215px;
`

export const CardElement: React.FC<ICardProps> = observer(({ card }) => {
  const [cardWordsPosition, setCardWordsPosition] = useState<number>(0)

  return (
    <Link key={card.id} to={`/card/${card.id}`}>
      <CardContainer key={card.id} color={card.ui.headColor}>
        <PlaceForCursor
          onMouseEnter={() => setCardWordsPosition(-90)}
          onMouseLeave={() => setCardWordsPosition(0)}
        />
        <CardHeading color={card.ui.headColor}>
          <CardTitle>{card.name}</CardTitle>
          <CardAuthor>{card.author}</CardAuthor>
        </CardHeading>
        <CardWords color={card.ui.wordListColor} positionTop={cardWordsPosition}>
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
