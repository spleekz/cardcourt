import styled from 'styled-components'

export const CardWordPairBlock = styled.div<{ highlightOnHover?: boolean }>`
  padding: 7px 15px;
  border-bottom: 2px solid #e5e5e5;

  &:first-child {
    padding-top: 0px;
  }
  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${(props) => props.highlightOnHover && '#fffffff7'};
  }
`
