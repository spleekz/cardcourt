import { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'
import { PartialBy } from '../../basic-utility-types'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string
  height?: string
  fontSize: number
  backgroundColor?: string
  color?: string
  marginTop?: number
  marginRight?: number
  marginBottom?: number
  marginLeft?: number
}
export type ColorButtonProps = Omit<PartialBy<ButtonProps, 'fontSize'>, 'backgroundColor' | 'color'>

export const Button = styled.button<ButtonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: 10px;
  font-size: ${(props) => `${props.fontSize}px`};
  border-radius: 3px;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  margin: ${(props) =>
    `${props.marginTop || 0}px ${props.marginRight || 0}px ${props.marginBottom || 0}px ${
      props.marginLeft || 0
    }px`};
`
