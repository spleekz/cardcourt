import React from 'react'
import { Popup, PopupProps } from '../popup'

export type DefaultPopupProps = Omit<PopupProps, 'withCloseButton'>

//DefaultPopup - обёртка над Popup, с обязательным onClose
export const DefaultPopup: React.FC<DefaultPopupProps> = ({
  width,
  height,
  title,
  onClose,
  afterClose,
  children,
}) => {
  return (
    <Popup width={width} height={height} title={title} onClose={onClose} afterClose={afterClose}>
      {children}
    </Popup>
  )
}
