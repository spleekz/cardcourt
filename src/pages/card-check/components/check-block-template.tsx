import React from 'react'

import useResizeAware from 'react-resize-aware'
import styled from 'styled-components'

type Props = {
  width: number
  height: number
}

export const CardCheckBlockTemplate: React.FC<Props> = ({ width, height, children }) => {
  const childrenArray = React.Children.toArray(children)
  const [title, content, footer] = childrenArray

  const [containerResizeListener, containerSize] = useResizeAware()
  const containerHeight = containerSize.height ?? 0

  const [titleResizeListener, titleSize] = useResizeAware()
  const titleHeight = titleSize.height ?? 0

  const [footerResizeListener, footerSize] = useResizeAware()
  const footerHeight = footerSize.height ?? 0

  const contentHeight = containerHeight - (titleHeight + footerHeight)

  return (
    <Container width={width} height={height}>
      {containerResizeListener}
      <CardCheckBlockHeading>
        {titleResizeListener}
        {title}
      </CardCheckBlockHeading>
      <CardCheckBlockContent height={contentHeight}>{content}</CardCheckBlockContent>
      <CardCheckBlockFooter footerProvided={Boolean(footer)}>
        {footerResizeListener}
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
