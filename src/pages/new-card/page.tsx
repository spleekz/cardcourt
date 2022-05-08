import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { FormCard } from '../../components/card/variants/form-card/form-card'
import { ScreenPreloader } from '../../components/icons/screen-preloader'
import { registerPage } from '../../hocs/register-page'
import { useStore } from '../../stores/root-store/context'
import { getCardWidthByHeight } from '../../utils/cards'

export const NewCardPage: React.FC = registerPage(
  observer(() => {
    const { authStore } = useStore()

    const cardHeight = 780
    const cardWidth = getCardWidthByHeight(cardHeight)

    if (authStore.meLoadingState.loading) {
      return <ScreenPreloader />
    }

    return (
      <Container>
        <FormCard width={cardWidth} height={cardHeight} />
      </Container>
    )
  }),
  { isProtected: true }
)

const Container = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
