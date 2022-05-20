import React from 'react'

import { observer } from 'mobx-react-lite'

import { CardNotFound } from 'components/messages/errors/card-not-found'
import { NotCardAuthor } from 'components/messages/errors/not-card-author'
import { UnknownError } from 'components/messages/errors/unknown-error'

import { useCardStoreFromURL } from 'hooks/use-card-store-from-url'

import { registerPage } from 'hocs/register-page'

import { content } from 'utils/page-content'

import { ScreenPreloader } from 'assets/svg/components/screen-preloader'

import { CardPageOriginalContent } from './original-content'

export const CardPage: React.FC = registerPage(
  observer(() => {
    const { cardStore } = useCardStoreFromURL()
    const loadingState = cardStore.cardLoadingState
    const deletingState = cardStore.cardDeletingState

    const pageContent = content({
      loading: loadingState.loading,
      original: <CardPageOriginalContent cardStore={cardStore} />,
      variants: [
        { state: loadingState.notFound, element: <CardNotFound /> },
        {
          state: deletingState.notCardAuthor,
          element: <NotCardAuthor />,
        },
        {
          state: loadingState.unknownError,
          element: <UnknownError withButton={true} />,
        },
      ],
    })

    return (
      <>
        {pageContent}
        {cardStore.cardDeletingState.loading && <ScreenPreloader />}
      </>
    )
  }),
  { isRootPath: true },
)
