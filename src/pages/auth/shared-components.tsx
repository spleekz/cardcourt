import React from 'react'
import styled from 'styled-components'
import { BlueButton } from '../../components/buttons/blue-button'
import { ColorButtonProps } from '../../components/buttons/button'

export const AuthFormInput = styled.input`
  margin-bottom: 16px;
  font-size: 42px;
  background-color: #ffffff;
  border-bottom: 1px solid #000000;
  font-weight: bold;
  padding: 3px;
`
export const AuthFormErrorBlock = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 0;
`
export const AuthButton: React.FC<ColorButtonProps> = (props) => {
  return <BlueButton fontSize={27} {...props} />
}

export const ToAnotherWayOfAuth = styled.div`
  display: inline-block;
  padding: 7px;
  font-size: 25px;
  font-weight: bold;
  background-color: #fff;
`
export const ToAnotherWayOfAuthLink = styled.span`
  text-decoration: underline;
`
