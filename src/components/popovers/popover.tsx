import React, { useEffect, useRef } from 'react'

import { EmptyFunction } from 'basic-utility-types'

import { useClickOutside } from 'hooks/use-click-outside'
import { useLocationChange } from 'hooks/use-location-change'

import { PopoverContainer, PopoverContainerProps } from './shared-components'

type PopoverState = {
  isOpened: boolean
  fnForClosing: EmptyFunction
  afterClose?: EmptyFunction
  //Элемент, при клике на который показывается поповер
  //Такой элемент должен открывать/закрывать поповер и не считаться кликом вне поповера
  elementForActivating?: React.RefObject<HTMLElement | null>
}

export type PopoverProps = PopoverContainerProps & PopoverState
export type PopoverVariantProps = PopoverState

export const Popover: React.FC<PopoverProps> = ({
  width,
  height,
  top,
  left,
  bottom,
  right,
  fnForClosing,
  afterClose,
  isOpened,
  elementForActivating,
  children,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return () => {
      afterClose?.()
    }
  }, [])

  //Хук вызовется в ЛЮБОМ случае
  if (elementForActivating) {
    useClickOutside({ ref: [popoverRef, elementForActivating], fn: fnForClosing })
  } else {
    useClickOutside({ ref: popoverRef, fn: fnForClosing })
  }

  useLocationChange(fnForClosing)

  if (!isOpened) {
    return null
  }

  return (
    <PopoverContainer
      ref={popoverRef}
      width={width}
      height={height}
      top={top}
      left={left}
      bottom={bottom}
      right={right}
    >
      {children}
    </PopoverContainer>
  )
}
