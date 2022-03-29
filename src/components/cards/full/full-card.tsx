import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { WordList } from '../../card-slider/element/word-list'
import { useCard } from '../../../hooks/use-card'
import { useStore } from '../../../stores/root-store/context'
import { useNavigate } from 'react-router-dom'
import { PencilIcon } from '../../icons/pencil-icon'

export const FullCard: React.FC = observer(() => {
  const { cardsStore } = useStore()

  const { cardId } = useParams()
  const navigate = useNavigate()

  const card = useCard(cardId)

  const goToEditCard = (): void => {
    navigate(`/card/${card!._id}/edit`)
  }
  const deleteCard = (id: string): void => {
    cardsStore.deleteCard(id)
  }

  return (
    <>
      {card && (
        <Container>
          {card.name}
          <Link to={`check`}>
            <GoToCheckButton>Начать проверку</GoToCheckButton>
          </Link>
          <EditButton onClick={goToEditCard}>
            <PencilIcon />
          </EditButton>
          <DeleteButton onClick={() => deleteCard(card._id)}>Удалить</DeleteButton>
          <WordList card={card} />
        </Container>
      )}
    </>
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
