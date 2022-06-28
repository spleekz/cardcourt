import React, { useLayoutEffect, useRef, useState } from 'react'

import styled from 'styled-components'

type Props = {
  width: number
  height: number
  bodyColor: string
  wordsColor: string
}

//В CardTemplate можно передать только ТРИ узла - заглавие(состоит из имени карточки и ее автора),
//тело карточки и футер (если нужен)
export const CardTemplate: React.FC<Props> = ({ width, height, bodyColor, wordsColor, children }) => {
  const childrenArray = React.Children.toArray(children)
  const [cardHeading, cardBody, cardFooter] = childrenArray

  const [bodyHeight, setBodyHeight] = useState(0)

  //Используем рефы, чтобы взять высоту хединга и футера
  const headingRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (headingRef.current && footerRef.current) {
      //Используем getBoundingClientRect, т.к. он вернет точную высоту, а не округленную
      const headingHeight = headingRef.current.getBoundingClientRect().height
      const footerHeight = footerRef.current.getBoundingClientRect().height
      setBodyHeight(height - (headingHeight + footerHeight))
    }
  }, [headingRef, footerRef])

  return (
    <Container width={width} height={height} color={bodyColor}>
      <CardHeading ref={headingRef}>{cardHeading}</CardHeading>

      <CardBody height={bodyHeight} color={wordsColor}>
        {cardBody}
      </CardBody>

      <CardFooter ref={footerRef}>{cardFooter}</CardFooter>
    </Container>
  )
}

const Container = styled.div<{ width: number; height: number; color: string }>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  background-color: ${(props) => props.color};
  display: flex;
  flex-direction: column;
  position: relative;
  top: 0;
  left: 0;
  border-radius: 16px;
`
const CardHeading = styled.div``
const CardBody = styled.div<{ height: number; color: string }>`
  height: ${(props) => `${props.height}px`};
  position: relative;
  width: 100%;
  padding: 0px 0px 4px 0px;
  border-radius: 16px;
  overflow: auto;
  background-color: ${(props) => props.color};
`
const CardFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
