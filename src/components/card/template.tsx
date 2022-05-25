import React, { useRef } from 'react'

import styled from 'styled-components'

import { useElementSize } from 'hooks/use-element-size'

interface Props {
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

  //Используем рефы, чтобы взять высоту хединга и футера
  const headingRef = useRef<HTMLDivElement>(null)
  const headingHeight = useElementSize(headingRef).height

  const footerRef = useRef<HTMLDivElement>(null)
  const footerHeight = useElementSize(footerRef).height

  const bodyHeight = height - (headingHeight + footerHeight)

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
