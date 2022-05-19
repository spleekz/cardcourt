import React from 'react'
import { Link } from 'react-router-dom'
import { BlueButton } from '../../../buttons/blue-button'
import { PopupVariantProps } from '../../popup'
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
      <BlueButton fontSize={32}>
        <Link to='/'>На главную</Link>
      </BlueButton>
    </PopupWithCustomClose>
  )
}
