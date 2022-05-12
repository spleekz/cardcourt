import React from 'react'
import { EmptyFunction } from '../../../basic-utility-types'
import { Popup, PopupTypeProps } from '../popup'

export type PopupWithCustomCloseVariantProps<T> = { fnForClosing: EmptyFunction } & T

//Обёртка над Popup, где withCloseButton = false
export const PopupWithCustomClose: React.FC<PopupTypeProps> = ({
  width,
  height,
  title,
  fnForClosing,
  afterClose,
  children,
}) => {
  return (
    <Popup
      width={width}
      height={height}
      title={title}
      fnForClosing={fnForClosing}
      afterClose={afterClose}
      withCloseButton={false}
    >
      {children}
    </Popup>
  )
}
