import { observer } from 'mobx-react-lite'
import React from 'react'
import { useCardStoreFromURL } from '../../hooks/use-card-store-from-url'
import { registerPage } from '../../hocs/register-page'
import { CardNotFound } from '../../components/messages/errors/card-not-found'
import { UnknownError } from '../../components/messages/errors/unknown-error'
import { content } from '../../utils/page-content'
import { EditCardPageOriginalContent } from './original-content'
import { UpdatedCardNotExists } from '../../components/messages/errors/updated-card-not-exists'
import { NotCardAuthor } from '../../components/messages/errors/not-card-author'
import { ScreenPreloader } from '../../assets/svg/components/screen-preloader'

export const EditCardPage: React.FC = registerPage(
  observer(() => {
    const {cardStore} = useCardStoreFromURL()

    const pageContent = content({
      loading: cardStore.cardLoadingState.loading || cardStore.authStore.meLoadingState.loading,
      original: <EditCardPageOriginalContent editedCardStore={cardStore} />,
      variants: [
        {
          state: !cardStore.meIsAuthor,
          element: <NotCardAuthor />,
        },
        {
          state: cardStore.cardLoadingState.notFound,
          element: <CardNotFound />,
        },
        {
          state: cardStore.cardUpdatingState.notFound,
          element: <UpdatedCardNotExists />,
        },
        {
          state: cardStore.cardUpdatingState.notCardAuthor,
          element: <NotCardAuthor />,
        },
        {
          state: cardStore.cardLoadingState.unknownError || cardStore.cardUpdatingState.unknownError,
          element: <UnknownError withButton={true} />,
        },
      ],
    })

    return (
      <>
        {pageContent}
        {cardStore.cardUpdatingState.loading && <ScreenPreloader />}
      </>
    )
  }),
  { isProtected: true }
)
