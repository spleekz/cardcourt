import React from 'react'

import styled from 'styled-components'

import { PortalToBody } from 'components/utility/portal-to-body'

import PreloaderSVG from '../preloader.svg'

interface Props {
  blackout?: boolean
}

export const ScreenPreloader: React.FC<Props> = ({ blackout = false }) => {
  return (
    <PortalToBody>
      <Container blackout={blackout}>
        <img width={150} src={PreloaderSVG} />
      </Container>
    </PortalToBody>
  )
}

const Container = styled.div<{ blackout: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.blackout && `rgba(0, 0, 0, 0.25)`};
`
