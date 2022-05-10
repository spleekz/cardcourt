import React from 'react'
import { EmptyFunction } from '../../../basic-utility-types'
import { Popup, PopupProps } from '../popup'

export type PopupWithCustomCloseProps = Omit<PopupProps, 'onClose'>
export type PopupWithCustomCloseVariantProps<T> = { actionToClosePopup?: EmptyFunction } & T

//Обёртка над Popup, где нет onClose
export const PopupWithCustomClose: React.FC<PopupWithCustomCloseProps> = ({
  width,
  height,
  title,
  afterClose,
  children,
}) => {
  return (
    <Popup width={width} height={height} title={title} afterClose={afterClose}>
      {children}
    </Popup>
  )
}
