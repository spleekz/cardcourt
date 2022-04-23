import React from 'react'
import { observer } from 'mobx-react-lite'
import { registerPage } from '../../hocs/register-page'
import { ScreenPreloader } from '../../components/icons/screen-preloader'
import { useCardStoreFromURL } from '../../hooks/use-card-store-from-url'
import { getCardWidthByHeight } from '../../utils/cards'
import { FullCard } from '../../components/card/variants/full-card'
import styled from 'styled-components'
import { PencilIcon } from '../../components/icons/pencil-icon'
import { Link } from 'react-router-dom'
import { XIcon } from '../../components/icons/x-icon'

export const CardPage: React.FC = registerPage(
  observer(() => {
    const cardStore = useCardStoreFromURL()
    const { card } = cardStore

    if (!card) {
      return <ScreenPreloader />
    }

    const cardHeight = 780
    const cardWidth = getCardWidthByHeight(cardHeight)

    return (
      <Container>
        <CardContainer>
          <FullCard card={card} width={cardWidth} height={cardHeight} />
          <Icons>
            <Link to={`edit`}>
              <Icon>
                <PencilIcon />
              </Icon>
            </Link>
            <Icon onClick={() => cardStore.deleteCard(card._id)}>
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
