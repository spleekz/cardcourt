import styled, { css } from 'styled-components'

const cardNameCss = css`
  font-family: 'Arial';
  color: #424242;
  font-weight: bold;
`

export const CardNameDiv = styled.div`
  ${cardNameCss}
`
export const CardNameInput = styled.input`
  ${cardNameCss}
`

export const CardAuthorDiv = styled.div`
  color: #606060;
`

export const CardFooterButton = styled.button`
  width: 100%;
  padding: 4px;
  font-size: 28px;
  font-weight: bold;
  background-color: transparent;
`
