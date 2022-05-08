import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import { useCardStoreFromURL } from '../../hooks/use-card-store-from-url'
import { registerPage } from '../../hocs/register-page'
import { ScreenPreloader } from '../../components/icons/screen-preloader'
import { FormCard } from '../../components/card/variants/form-card/form-card'
import { getCardWidthByHeight } from '../../utils/cards'
import { CardNotFound } from '../../components/messages/errors/card-not-found'
import { UnknownError } from '../../components/messages/errors/unknown-error'

export const EditCardPage: React.FC = registerPage(
  observer(() => {
    const cardStore = useCardStoreFromURL()
    const { card } = cardStore

    const cardHeight = 780
    const cardWidth = getCardWidthByHeight(cardHeight)

    return (
      <>
        {cardStore.cardLoadingState.success && card ? (
          <Container>
            <FormCard card={card} width={cardWidth} height={cardHeight} />
          </Container>
        ) : cardStore.cardLoadingState.loading ? (
          <ScreenPreloader />
        ) : cardStore.cardLoadingState.notFound ? (
          <CardNotFound />
        ) : (
          <UnknownError withButton={true} />
        )}
      </>
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
