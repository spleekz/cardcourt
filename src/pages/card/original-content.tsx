import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { getCardWidthByHeight } from '../../utils/cards'
import { FullCard } from '../../components/card/variants/full-card'
import { Link } from 'react-router-dom'
import { PencilIcon } from '../../components/icons/pencil-icon'
import { XIcon } from '../../components/icons/x-icon'
import { CurrentCardStore } from '../../stores/current-card-store'

interface Props {
  cardStore: CurrentCardStore
}

export const CardPageOriginalContent: React.FC<Props> = observer(({ cardStore }) => {
  const { card } = cardStore

  const cardHeight = 780
  const cardWidth = getCardWidthByHeight(cardHeight)

  return (
    <>
      {card && (
        <Container>
          <CardContainer>
            <FullCard card={card} width={cardWidth} height={cardHeight} />
            <Icons>
              <Link to={`edit`}>
                <Icon>
                  <PencilIcon />
                </Icon>
              </Link>
              <Icon onClick={() => cardStore.deleteCard()}>
                <XIcon />
              </Icon>
            </Icons>
          </CardContainer>
        </Container>
      )}
    </>
  )
})

const Container = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Icons = styled.div`
  align-self: flex-start;
  margin-left: 16px;
`
const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: #f6f6f6;
  border-radius: 8px;
  margin-bottom: 10px;

  svg {
    width: 30px;
  }

  &:hover {
    cursor: pointer;
  }
`
