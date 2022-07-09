import React, { useLayoutEffect, useRef, useState } from 'react'

import useResizeAware from 'react-resize-aware'
import styled from 'styled-components'

import { isElementEmpty } from 'utils/react'

type Props = {
  width: number
  height: number
  absoluteFooterPosition?: boolean
}

export const CardCheckBlockTemplate: React.FC<Props> = ({
  width,
  height,
  absoluteFooterPosition,
  children,
}) => {
  const childrenArray = React.Children.toArray(children)
  const [heading, content, footer] = childrenArray

  const footerProvided = !isElementEmpty(footer)

  const [containerSizeListener, containerSize] = useResizeAware()
  const [contentHeight, setContentHeight] = useState(0)

  const headingRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (headingRef.current || footerRef.current) {
      const headingHeight = headingRef.current?.getBoundingClientRect().height ?? 0
      const footerHeight = footerRef.current?.getBoundingClientRect().height ?? 0

      setContentHeight(Number(containerSize.height) - (headingHeight + footerHeight))
    }
  }, [containerSize.height, containerSize.width])

  return (
    <Container width={width} height={containerSize.height === null ? height : containerSize.height}>
      {containerSizeListener}
      <CardCheckBlockHeading ref={headingRef}>{heading}</CardCheckBlockHeading>
      <CardCheckBlockContent height={contentHeight}>{content}</CardCheckBlockContent>
      {footerProvided && (
        <CardCheckBlockFooter ref={footerRef} absolutePosition={absoluteFooterPosition}>
          {footer}
        </CardCheckBlockFooter>
      )}
    </Container>
  )
}

const Container = styled.div<{ width: number; height: number }>`
  position: relative;
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  display: flex;
  flex-direction: column;
  background-color: #fafbfc;
  border-radius: 16px;
  box-shadow: 0px 0px 16px 5px rgba(34, 60, 80, 0.2);
  overflow: hidden;
`
export const CardCheckBlockHeading = styled.div`
  position: relative;
  padding: 16px;
  font-size: 35px;
  font-weight: bold;
  text-align: center;
  border-bottom: 2px solid #686868;
`
export const CardCheckBlockContent = styled.div<{ height: number }>`
  height: ${(props) => `${props.height}px`};
  padding: 10px 16px;
  overflow: auto;
`
export const CardCheckBlockFooter = styled.div<{ absolutePosition?: boolean }>`
  position: ${(props) => (props.absolutePosition ? 'absolute' : 'relative')};
  bottom: 0;
  right: 0;
  left: 0;
  padding: ${(props) => !props.absolutePosition && '10px 16px 16px 16px'};
`
