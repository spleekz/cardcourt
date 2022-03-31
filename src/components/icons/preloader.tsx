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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`
