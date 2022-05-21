import React, { useEffect, useState } from 'react'

import { AnyObject, EmptyFunction } from 'basic-utility-types'
import { useCallbackRef } from 'use-callback-ref'

import { useClickOutside } from 'hooks/use-click-outside'
import { useLocationChange } from 'hooks/use-location-change'

import { PopoverContainer, PopoverContainerProps } from './shared-components'

interface PopoverState {
  isOpened: boolean
  fnForClosing: EmptyFunction
  afterClose?: EmptyFunction
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
  children,
}) => {
  const [, forceUpdate] = useState<AnyObject>()

  const popoverRef = useCallbackRef<HTMLDivElement>(null, () => {
    forceUpdate({})
  })

  useEffect(() => {
    return () => {
      afterClose?.()
    }
  }, [])

  useClickOutside({ ref: popoverRef, fn: fnForClosing })

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
