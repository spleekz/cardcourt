import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Card } from '../../../api/api'
import { observer } from 'mobx-react-lite'
import { WordList } from './word-list'
import { useStore } from '../../../stores/root-store/context'

export interface ICardElementProps {
  card: Card
  width?: number
  height?: number
}

export const CardElement: React.FC<ICardElementProps> = observer((props) => {
  const { cardsStore } = useStore()

  const {
    card,
    width = cardsStore.defaultCardSize.width,
    height = cardsStore.defaultCardSize.height,
  } = props

  return (
    <Link key={card._id} to={`/card/${card._id}`}>
      <Container key={card._id} color={card.ui.headColor} width={width} height={height}>
        <Heading color={card.ui.headColor}>
          <Name>{card.name}</Name>
          <Author>{card.author.name}</Author>
        </Heading>
        <WordsContainer color={card.ui.bodyColor}>
          <WordList card={card} />
        </WordsContainer>
      </Container>
    </Link>
  )
})

export const Container = styled.div<{ color: string; width: number; height: number }>`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 0;
  left: 0;
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  margin: 0 8px 0 8px;
  background-color: ${(props) => props.color};
  border-radius: 16px;
  overflow: hidden;
`
export const Heading = styled.div<{ color: string }>`
  padding: 2px 15px;
  background-color: ${(props) => props.color};
`
const Name = styled.div`
  font-size: 40px;
  font-weight: bold;
`
export const Author = styled.div`
  font-size: 25px;
  color: #000000a0;
`
export const WordsContainer = styled.div<{ color: string }>`
  min-height: 502px;
  position: relative;
  top: 0;
  left: 0;
  margin-top: 10px;
  background-color: ${(props) => props.color};
  padding: 4px 15px;
  border-radius: 16px 16px 0 0;
  transition: 0.4s;
`
