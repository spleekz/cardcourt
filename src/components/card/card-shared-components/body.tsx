import styled from 'styled-components'

export const CardWordPairBlock = styled.div<{ highlightOnHover?: boolean; highlightColor?: string }>`
  padding: 7px 15px;
  border-bottom: 2px solid #e5e5e5;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${(props) => props.highlightOnHover && (props.highlightColor || '#fffffff7')};
  }
`
