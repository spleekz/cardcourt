import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { XLg } from 'react-bootstrap-icons'
import styled from 'styled-components'
import { AnyObject, EmptyFunction } from '../../basic-utility-types'
import { useLocationChange } from '../../hooks/use-location-change'
import { useStore } from '../../stores/root-store/context'
import { PortalToBody } from '../portal-to-body'
import { PopupBlock, PopupContainer, PopupTitle } from './shared-components'

//afterClose - функция, выполняющаяся при закрытии попапа любым способом
export interface PopupProps {
  width: string
  height: string
  title: string | JSX.Element
  isOpened: boolean
  fnForClosing: EmptyFunction
  withCloseButton: boolean
  afterClose?: EmptyFunction
}

export type PopupState = Pick<PopupProps, 'fnForClosing' | 'afterClose' | 'isOpened'>
export type PopupTypeProps = Omit<PopupProps, 'withCloseButton'>
export type PopupVariantProps<T = AnyObject> = PopupState & T

export const Popup: React.FC<PopupProps> = observer(
  ({ width, height, title, isOpened, fnForClosing, withCloseButton, afterClose, children }) => {
    const { appStore } = useStore()

    useEffect(() => {
      if (isOpened) {
        appStore.setIsPopupOpened(true)
      }
      return () => {
        appStore.setIsPopupOpened(false)
        //Если попап исчезает, то выполнить функцию после закрытия
        afterClose?.()
      }
    }, [])

    useLocationChange(fnForClosing)

    if (!isOpened) {
      return null
    }

    return (
      <PortalToBody>
        <PopupContainer>
          <PopupBlock width={width} height={height}>
            <PopupTitleBlock>
              <PopupTitle>{title}</PopupTitle>
              {withCloseButton && (
                <ClosePopupButton onClick={fnForClosing}>
                  <XLg size={35} />
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
