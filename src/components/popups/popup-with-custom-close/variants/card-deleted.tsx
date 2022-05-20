import React from 'react'

import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { BlueButton } from 'components/buttons/blue-button'
import { PopupVariantProps } from 'components/popups/popup'

import { PopupWithCustomClose } from '../popup-with-custom-close'

export const CardDeletedPopup: React.FC<PopupVariantProps> = ({ fnForClosing, isOpened }) => {
  return (
    <PopupWithCustomClose
      title={`Карточка удалена`}
      width={'460px'}
      height={'230px'}
      fnForClosing={fnForClosing}
      isOpened={isOpened}
    >
      <RedirectButton>
        <Link to='/'>На главную</Link>
      </RedirectButton>
    </PopupWithCustomClose>
  )
}

const RedirectButton = styled(BlueButton)`
  font-size: 32px;
`
