import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ICard } from '../../../stores/CardsStore'
import { observer } from 'mobx-react-lite'
import { WordList } from '../../WordList'
import { useStore } from '../../../stores/RootStore/RootStoreContext'

export interface ICardElementProps {
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
const DeleteButton = styled.button`
  position: absolute;
  bottom: 0px;
  width: 100%;
  font-size: 28px;
`

export const CardElement: React.FC<ICardElementProps> = observer(({ card }) => {
  const { CardsStore } = useStore()

  const deleteCard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string): void => {
    e.preventDefault()
    CardsStore.deleteCard(id)
  }

  return (
    <Link key={card.id} to={`/card/${card.id}`}>
      <CardContainer key={card.id} color={card.ui.headColor}>
        <CardHeading color={card.ui.headColor}>
          <CardName>{card.name}</CardName>
          <CardAuthor>{card.author}</CardAuthor>
        </CardHeading>
        <CardWords color={card.ui.wordListColor} isHover>
          <WordList card={card} />
        </CardWords>
        <DeleteButton onClick={(e) => deleteCard(e, card.id)}>Удалить</DeleteButton>
      </CardContainer>
    </Link>
  )
})
