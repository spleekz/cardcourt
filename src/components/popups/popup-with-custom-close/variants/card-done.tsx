import React from 'react'

import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { BlueButton } from 'components/buttons/blue-button'
import { PopupVariantProps } from 'components/popups/popup'

import { PopupWithCustomClose } from '../popup-with-custom-close'

type CardDoneProps = {
  title: string
  cardId: string | null
}

export const CardDonePopup: React.FC<PopupVariantProps<CardDoneProps>> = ({
  title,
  cardId,
  isOpened,
  fnForClosing,
}) => {
  return (
    <PopupWithCustomClose
      width={'610px'}
      height={'330px'}
      title={title}
      isOpened={isOpened}
      fnForClosing={fnForClosing}
    >
      <Message>Куда идём дальше?</Message>
      <ButtonsList>
        <NavLink to='/'>
          <RedirectButton>На главную</RedirectButton>
        </NavLink>
        <NavLink to={`/card/${cardId}`}>
          <RedirectButton>На карточку</RedirectButton>
        </NavLink>
      </ButtonsList>
    </PopupWithCustomClose>
  )
}

const Message = styled.h3`
  font-size: 42px;
  text-align: center;
`
const ButtonsList = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 25px 0 0 0;
`
const RedirectButton = styled(BlueButton)`
  font-size: 32px;
  margin: 0 15px;
`
