import React from 'react'
import { Popup, PopupTypeProps } from '../popup'

//Обёртка над Popup, где withCloseButton = false
export const PopupWithCustomClose: React.FC<PopupTypeProps> = ({
  width,
  height,
  title,
  isOpened,
  fnForClosing,
  afterClose,
  children,
}) => {
  return (
    <Popup
      width={width}
      height={height}
      title={title}
      isOpened={isOpened}
      fnForClosing={fnForClosing}
      afterClose={afterClose}
      withCloseButton={false}
    >
      {children}
    </Popup>
  )
}
