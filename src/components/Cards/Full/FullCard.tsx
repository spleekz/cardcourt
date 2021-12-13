import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { WordList } from '../../WordList'
import { useCard } from '../../../hooks/useCard'

const CardPageContainer = styled.div`
  font-size: 40px;
`
const ToCheckPageButton = styled.button`
  font-size: 30px;
`

export const FullCard: React.FC = observer(() => {
  const { cardId } = useParams()

  const card = useCard(cardId)

  return (
    <>
      {card && (
        <CardPageContainer>
          {card.name}
          <Link to={`check`}>
            <ToCheckPageButton>Начать проверку</ToCheckPageButton>
          </Link>
          <WordList card={card} />
        </CardPageContainer>
      )}
    </>
  )
})
