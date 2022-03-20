import React from 'react'
import styled from 'styled-components'
import PreloaderSVG from '../../svg/preloader.svg'

export const Preloader: React.FC = () => {
  return (
    <Container>
      <img width={150} src={PreloaderSVG} />
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
