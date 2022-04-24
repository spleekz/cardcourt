import React, { useEffect } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { PortalToBody } from '../portal-to-body'
import { useStore } from '../../stores/root-store/context'

interface Props {
  title: string
  cardId: string
}

export const CardDonePopup: React.FC<Props> = ({ title, cardId }) => {
  const { appStore } = useStore()

  useEffect(() => {
    appStore.setIsAnyPopupOpened(true)
    return () => appStore.setIsAnyPopupOpened(false)
  }, [])

  return (
    <PortalToBody>
      <Container>
        <PopupBlock>
          <Title>{title}</Title>
          <Body>
            <Message>Куда идём дальше?</Message>
            <ButtonsList>
              <NavLink to='/'>
                <RedirectButton>
                  на главную!<p>👈</p>
                </RedirectButton>
              </NavLink>
              <NavLink to={`/card/${cardId}`}>
                <RedirectButton>
                  на карточку!<p>👉</p>
                </RedirectButton>
              </NavLink>
            </ButtonsList>
          </Body>
        </PopupBlock>
      </Container>
    </PortalToBody>
  )
}

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000083;
  transition: 0.3s;
`
const PopupBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 750px;
  height: 400px;
  padding: 25px;
  background-color: #ffffff;
  border-radius: 50px 7px 50px 7px;
  transition: 0.3s;
`
const Title = styled.h1`
  text-align: center;
  font-size: 56px;
`
const Body = styled.div`
  margin: 20px 0;
`
const Message = styled.h3`
  text-align: center;
  font-size: 42px;
`
const ButtonsList = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 18px 0 0 0;
`
const RedirectButton = styled.button`
  padding: 5px;
  font-size: 32px;
`
