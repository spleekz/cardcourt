import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { EmptyFunction } from '../../basic-utility-types'
import { useClickOutside } from '../../hooks/use-click-outside'
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

  const location = useLocation()

  const [isFirstEffectRun, setIsFirstEffectRun] = useState(true)
  useEffect(() => {
    if (isFirstEffectRun) {
      setIsFirstEffectRun(false)
    } else {
      onClose()
    }
  }, [location.key])

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
