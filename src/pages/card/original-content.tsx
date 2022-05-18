import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { getCardWidthByHeight } from '../../utils/cards'
import { FullCard } from '../../components/card/variants/full-card'
import { Link } from 'react-router-dom'
import { CurrentCardStore } from '../../stores/current-card-store'
import { CardDeletedPopup } from '../../components/popups/popup-with-custom-close/variants/card-deleted'
import { ConfirmPopup } from '../../components/popups/confirm-popup/confirm-popup'
import { Pencil, Trash } from 'react-bootstrap-icons'

interface Props {
  cardStore: CurrentCardStore
}

export const CardPageOriginalContent: React.FC<Props> = observer(({ cardStore }) => {
  const { card } = cardStore

  const cardHeight = 780
  const cardWidth = getCardWidthByHeight(cardHeight)

  const [cardDeleteConfirmPopupShown, setCardDeketeConfirmPopupShown] = useState(false)
  const [cardDeletedPopupShown, setCardDeletedPopupShown] = useState(false)

  return (
    <>
      {card && (
        <>
          <Container>
            <CardContainer>
              <FullCard card={card} width={cardWidth} height={cardHeight} />
              {cardStore.meIsAuthor && (
                <Icons>
                  <Link to={`edit`}>
                    <Icon>
                      <Pencil size={30} />
                    </Icon>
                  </Link>
                  <Icon onClick={() => setCardDeketeConfirmPopupShown(true)}>
                    <Trash size={30} />
                  </Icon>
                </Icons>
              )}
            </CardContainer>
          </Container>

          <ConfirmPopup
            width={'600px'}
            height={'260px'}
            title={
              <>
                Вы уверены, что хотите удалить карточку <Bold>{card.name}</Bold>?
              </>
            }
            acceptText={'Да'}
            accept={() =>
              cardStore.deleteCard().then(() => {
                setCardDeletedPopupShown(true)
              })
            }
            rejectText={'Нет'}
            reject={() => setCardDeketeConfirmPopupShown(false)}
            fnForClosing={() => setCardDeketeConfirmPopupShown(false)}
            isOpened={cardDeleteConfirmPopupShown}
          />

          <CardDeletedPopup
            fnForClosing={() => setCardDeletedPopupShown(false)}
            isOpened={cardDeletedPopupShown}
          />
        </>
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
const Bold = styled.span`
  font-weight: bold;
`
