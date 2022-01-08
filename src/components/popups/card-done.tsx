import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useStore } from '../../stores/root-store/context'

interface Props {
  isOpened: boolean
  title: string
}

export const CardDonePopup: React.FC<Props> = ({ isOpened, title }) => {
  const { cardsStore } = useStore()

  return (
    <PopupContainer isOpened={isOpened}>
      <PopupBlock isOpened={isOpened}>
        <PopupTitle>{title}</PopupTitle>
        <PopupBody>
          <PopupText>Куда идём дальше?</PopupText>
          <ButtonsList>
            <NavLink to='/'>
              <RedirectButton>
                на главную!
                <p>👈</p>
              </RedirectButton>
            </NavLink>
            <NavLink to={`/card/${cardsStore.currentCardId.value}`}>
              <RedirectButton>
                на карточку!<p>👉</p>
              </RedirectButton>
            </NavLink>
          </ButtonsList>
        </PopupBody>
      </PopupBlock>
    </PopupContainer>
  )
}

const PopupContainer = styled.div<{ isOpened: boolean }>`
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
  opacity: ${(props) => (props.isOpened ? '1' : '0')};
  pointer-events: ${(props) => (props.isOpened ? 'all' : 'none')};
  transition: 0.3s;
`
const PopupBlock = styled.div<{ isOpened: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 750px;
  height: 400px;
  padding: 25px;
  background-color: #ffffff;
  border-radius: 50px 7px 50px 7px;
  transform: ${(props) => (props.isOpened ? 'scale(1)' : 'scale(0)')};
  transition: 0.3s;
`
const PopupTitle = styled.h1`
  text-align: center;
  font-size: 56px;
`
const PopupBody = styled.div`
  margin: 20px 0;
`
const PopupText = styled.h3`
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
