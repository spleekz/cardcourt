import styled from 'styled-components'

export interface PopoverContainerProps {
  width: string
  height?: string
  top?: number
  left?: number
  bottom?: number
  right?: number
}

export const PopoverContainer = styled.div<PopoverContainerProps>`
  position: absolute;
  top: ${(props) => props.top && `${props.top}px`};
  left: ${(props) => props.left && `${props.left}px`};
  bottom: ${(props) => props.bottom && `${props.bottom}px`};
  right: ${(props) => props.right && `${props.right}px`};
  z-index: 9999;
  width: ${(props) => props.width};
  height: ${(props) => props.height && props.height};
  font-size: 18px;
  border-radius: 10px;
  color: #000000;
  background-color: #fff;
`
export const PopoverList = styled.div`
  margin: 12px 0;
`
export const PopoverListItem = styled.div`
  font-size: 20px;
  padding: 2px 10px;
  background-color: #fff;
  transition: background-color 0.19s;
  :hover {
    cursor: pointer;
    background-color: #f2f2f2;
  }
`
