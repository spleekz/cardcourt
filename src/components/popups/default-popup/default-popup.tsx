import React from 'react'

import { Popup, PopupProps } from '../popup'

export type DefaultPopupProps = Omit<PopupProps, 'withCloseButton'>

//DefaultPopup - обёртка над Popup, где withCloseButton = true
export const DefaultPopup: React.FC<DefaultPopupProps> = ({
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
      withCloseButton={true}
    >
      {children}
    </Popup>
  )
}
