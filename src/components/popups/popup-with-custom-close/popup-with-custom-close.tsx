import React from 'react'
import { EmptyFunction, RequiredBy } from '../../../basic-utility-types'
import { useLocationChange } from '../../../hooks/use-location-change'
import { Popup, PopupProps } from '../popup'

export type PopupWithCustomCloseProps = RequiredBy<PopupProps, 'onClose'>
export type PopupWithCustomCloseVariantProps<T> = { actionToClosePopup: EmptyFunction } & T

//Обёртка над Popup, которая принимает onClose, но не передает его в попап
export const PopupWithCustomClose: React.FC<PopupWithCustomCloseProps> = ({
  width,
  height,
  title,
  onClose,
  afterClose,
  children,
}) => {
  useLocationChange(onClose)

  return (
    <Popup width={width} height={height} title={title} afterClose={afterClose}>
      {children}
    </Popup>
  )
}
