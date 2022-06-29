import React, { useLayoutEffect, useRef, useState } from 'react'

import useResizeAware from 'react-resize-aware'
import styled from 'styled-components'

type Props = {
  width: number
  height: number
}

export const CardCheckBlockTemplate: React.FC<Props> = ({ width, height, children }) => {
  const childrenArray = React.Children.toArray(children)
  const [heading, content, footer] = childrenArray

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
      <CardCheckBlockFooter ref={footerRef} footerProvided={Boolean(footer)}>
        {footer}
      </CardCheckBlockFooter>
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
export const CardCheckBlockFooter = styled.div<{ footerProvided: boolean }>`
  position: relative;
  bottom: 0;
  padding: ${(props) => props.footerProvided && `10px 16px 16px 16px`};
`
