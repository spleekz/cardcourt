import React from 'react'

import { observer } from 'mobx-react-lite'

import { CardNotFound } from 'components/messages/errors/card-not-found'

import { useCardStoreFromURL } from 'hooks/use-card-store-from-url'

import { content } from 'utils/page-content'

import { CheckPageOriginalContent } from './original-content'

export const CardCheckPage: React.FC = observer(() => {
  const { cardStore, card } = useCardStoreFromURL()

  const pageContent = content({
    loading: cardStore.cardLoadingState.loading,
    original: (card !== null && <CheckPageOriginalContent card={card} />) || <></>,
    variants: [
      {
        state: cardStore.cardLoadingState.notFound,
        element: <CardNotFound />,
      },
    ],
  })

  return pageContent
})
