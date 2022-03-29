import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { WordList } from '../../card-slider/element/word-list'
import { useStore } from '../../../stores/root-store/context'
import { PencilIcon } from '../../icons/pencil-icon'
import { Preloader } from '../../icons/preloader'
import { Card } from '../../../api/api'

interface Props {
  card: Card
}

export const FullCard: React.FC<Props> = observer(({ card }) => {
  const { cardsStore } = useStore()

  const deleteCard = (id: string): void => {
    cardsStore.deleteCard(id)
  }

  if (!card) {
    return <Preloader />
  }

  return (
    <Container>
      {card.name}
      <Link to={`check`}>
        <GoToCheckButton>Начать проверку</GoToCheckButton>
      </Link>
      <Link to={`/card/${card!._id}/edit`}>
        <EditButton>
          <PencilIcon />
        </EditButton>
      </Link>
      <DeleteButton onClick={() => deleteCard(card._id)}>Удалить</DeleteButton>
      <WordList card={card} />
    </Container>
  )
})

const Container = styled.div`
  font-size: 40px;
`
const GoToCheckButton = styled.button`
  font-size: 30px;
`
const EditButton = styled.button``
const DeleteButton = styled.button``
