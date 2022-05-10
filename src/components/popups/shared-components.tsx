import styled from 'styled-components'

export const PopupContainer = styled.div`
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
export const PopupBlock = styled.div<{ width: string; height: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: 25px;
  background-color: #ffffff;
  border-radius: 7px;
  transition: 0.3s;
`
export const PopupTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #000000;
`
