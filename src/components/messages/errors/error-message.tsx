import React from 'react'

import { Link } from 'react-router-dom'
import styled from 'styled-components'

type Props = {
  text: string
  height?: string
  fontSize?: number
  withButton: boolean
}

export const ErrorMessage: React.FC<Props> = ({
  text,
  height = '100%',
  fontSize = 32,
  withButton,
}) => {
  return (
    <Container>
      <ErrorText height={height} fontSize={fontSize}>
        {text}
      </ErrorText>
      {withButton && (
        <OnMainPageButton>
          <Link to={`/`}>На главную</Link>
        </OnMainPageButton>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ErrorText = styled.div<{ fontSize: number; height: string }>`
  width: 100%;
  height: ${(props) => props.height};
  padding: 10px;
  font-size: ${(props) => `${props.fontSize}px`};
  color: #ffffff;
  background-color: #d41c1cdf;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24px;
`
const OnMainPageButton = styled.button`
  width: 250px;
  height: 70px;
  font-size: 28px;
  font-weight: bold;
  border-radius: 6px;
  margin-bottom: 10px;
`
