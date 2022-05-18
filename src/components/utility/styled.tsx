import styled, { css } from 'styled-components'

export const Bold = styled.span`
  font-weight: bold;
`

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const pageContentCss = css`
  flex: 1 0 auto;
`

export const PageContentContainer = styled.div`
  ${pageContentCss}
`

export const CenteredPageContent = styled(CenteredContainer)`
  ${pageContentCss}
`
