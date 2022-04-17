//Общие компоненты всех карточек
import styled, { css } from 'styled-components'

//!Heading
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

//!Body
export const CardWordPairBlock = styled.div`
  padding: 7px 15px;
  border-bottom: 2px solid #e5e5e5;

  &:first-child {
    padding-top: 0px;
  }
  &:last-child {
    border-bottom: none;
  }
`

//!Footer
export const CardFooterButton = styled.button`
  width: 100%;
  padding: 4px;
  font-size: 28px;
  font-weight: bold;
  background-color: transparent;
`
