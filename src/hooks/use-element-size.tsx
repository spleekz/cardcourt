import React, { useEffect, useState } from 'react'

type ElementSize = {
  width: number
  height: number
}

export const useElementSize = (elementRef: React.RefObject<HTMLDivElement>): ElementSize => {
  const [elementWidth, setElementWidth] = useState(0)
  const [elementHeight, setElementHeight] = useState(0)

  useEffect(() => {
    if (elementRef.current) {
      //Используем getBoundingClientRect, т.к. он вернет точную высоту, а не округленную
      setElementWidth(elementRef.current.getBoundingClientRect().width)
      setElementHeight(elementRef.current.getBoundingClientRect().height)
    }
  }, [elementRef.current])

  return {
    width: elementWidth,
    height: elementHeight,
  }
}
