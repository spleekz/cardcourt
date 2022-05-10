import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { EmptyFunction } from '../../basic-utility-types'
import { useStore } from '../../stores/root-store/context'
import { XIcon } from '../icons/x-icon'
import { PortalToBody } from '../portal-to-body'
import { PopupBlock, PopupContainer, PopupTitle } from './shared-components'

//afterClose - функция, выполняющаяся при закрытии попапа любым способом
export interface PopupProps {
  width: string
  height: string
  title: string
  afterClose?: EmptyFunction
  onClose?: EmptyFunction
}

export const Popup: React.FC<PopupProps> = observer(
  ({ width, height, title, onClose, afterClose, children }) => {
    const { appStore } = useStore()

    useEffect(() => {
      appStore.setIsPopupOpened(true)

      return () => {
        appStore.setIsPopupOpened(false)
        //Если попап исчезает, то выполнить функцию после закрытия
        afterClose?.()
      }
    }, [])

    return (
      <PortalToBody>
        <PopupContainer>
          <PopupBlock width={width} height={height}>
            <PopupTitleBlock>
              <PopupTitle>{title}</PopupTitle>
              {onClose && (
                <ClosePopupButton onClick={onClose}>
                  <XIcon />
                </ClosePopupButton>
              )}
            </PopupTitleBlock>
            <PopupBody>{children}</PopupBody>
          </PopupBlock>
        </PopupContainer>
      </PortalToBody>
    )
  }
)

const PopupTitleBlock = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`
const ClosePopupButton = styled.button`
  position: absolute;
  right: 0;
  background-color: transparent;
  svg {
    width: 33px;
  }
`
const PopupBody = styled.div`
  margin: auto;
`
