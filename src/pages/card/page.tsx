import React from 'react'
import { observer } from 'mobx-react-lite'
import { registerPage } from '../../hocs/register-page'
import { Preloader } from '../../components/icons/preloader'
import { useCardFromURL } from '../../hooks/use-card-from-url'
import { getCardWidthByHeight } from '../../lib/cards'
import { FullCard } from '../../components/card/variants/full-card'
import styled from 'styled-components'
import { PencilIcon } from '../../components/icons/pencil-icon'
import { Link } from 'react-router-dom'
import { XIcon } from '../../components/icons/x-icon'
import { useStore } from '../../stores/root-store/context'

export const CardPage: React.FC = registerPage(
  observer(() => {
    const { cardsStore } = useStore()
    const card = useCardFromURL()

    if (!card) {
      return <Preloader />
    }

    const cardHeight = 780
    const cardWidth = getCardWidthByHeight(cardHeight)

    return (
      <Container>
        <CardContainer>
          <FullCard card={card} width={cardWidth} height={cardHeight} />
          <Icons>
            <Icon>
              <Link to={`edit`}>
                <PencilIcon />
              </Link>
            </Icon>
            <Icon onClick={() => cardsStore.deleteCard(card._id)}>
              <XIcon />
            </Icon>
          </Icons>
        </CardContainer>
      </Container>
    )
  }),
  { isRootPath: true }
)

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
