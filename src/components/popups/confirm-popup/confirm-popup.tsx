import React from 'react'
import styled from 'styled-components'
import { EmptyFunction } from '../../../basic-utility-types'
import { Popup, PopupTypeProps } from '../popup'

//fnForClosing - действие, чтобы закрыть попап
//onAccept / onReject - ТОЛЬКО то, что происходит при принятии / отклонеии
type ConfirmPopupProps = PopupTypeProps & {
  accept: EmptyFunction
  reject: EmptyFunction
  acceptText: string
  rejectText: string
}

export const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
  width,
  height,
  title,
  fnForClosing,
  afterClose,
  accept,
  reject,
  acceptText,
  rejectText,
  children,
}) => {
  const withClose = (fn: EmptyFunction): EmptyFunction => {
    return () => {
      fn()
      fnForClosing()
    }
  }

  const onAccept = withClose(accept)
  const onReject = withClose(reject)

  return (
    <Popup
      width={width}
      height={height}
      title={title}
      afterClose={afterClose}
      fnForClosing={fnForClosing}
      withCloseButton={false}
    >
      {children}
      <ButtonsContainer>
        <AcceptButton onClick={onAccept}>{acceptText}</AcceptButton>
        <RejectButton onClick={onReject}>{rejectText}</RejectButton>
      </ButtonsContainer>
    </Popup>
  )
}

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
`
const ConfirmPopupButton = styled.button`
  width: 180px;
  height: 50px;
  border-radius: 3px;
  margin: 0px 10px;
  font-size: 28px;
  font-weight: bold;
  border: 3px solid rgba(255, 255, 255, 0.671);
  transition: 0.3s;
`
const AcceptButton = styled(ConfirmPopupButton)`
  background-color: #4aff80cd;

  &:hover {
    background-color: #1dff61cd;
  }
`
const RejectButton = styled(ConfirmPopupButton)`
  background-color: #ff4a4acd;
  &:hover {
    background-color: #ff1d1dcd;
  }
`
