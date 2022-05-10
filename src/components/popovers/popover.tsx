import React, { useRef } from 'react'
import { EmptyFunction } from '../../basic-utility-types'
import { useClickOutside } from '../../hooks/use-click-outside'
import { useLocationChange } from '../../hooks/use-location-change'
import { PopoverContainer, PopoverContainerProps } from './shared-components'

export type PopoverProps = PopoverContainerProps & { onClose: EmptyFunction }
export type PopoverVariantProps = Pick<PopoverProps, 'onClose'>

export const Popover: React.FC<PopoverProps> = ({
  width,
  height,
  top,
  left,
  bottom,
  right,
  onClose,
  children,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null)

  useClickOutside({ ref: popoverRef, fn: onClose })

  useLocationChange(onClose)

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
