import React from 'react'
import styled from 'styled-components'
import PreloaderSVG from '../../assets/svg/preloader.svg'
import { PortalToBody } from '../portal-to-body'

export const ScreenPreloader: React.FC = () => {
  return (
    <PortalToBody>
      <Container>
        <img width={150} src={PreloaderSVG} />
      </Container>
    </PortalToBody>
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
