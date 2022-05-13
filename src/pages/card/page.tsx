import React from 'react'
import { observer } from 'mobx-react-lite'
import { registerPage } from '../../hocs/register-page'
import { useCardStoreFromURL } from '../../hooks/use-card-store-from-url'
import { CardNotFound } from '../../components/messages/errors/card-not-found'
import { content } from '../../utils/page-content'
import { UnknownError } from '../../components/messages/errors/unknown-error'
import { CardPageOriginalContent } from './original-content'

export const CardPage: React.FC = registerPage(
  observer(() => {
    const cardStore = useCardStoreFromURL()
    const loadingState = cardStore.cardLoadingState

    const pageContent = content({
      loading: loadingState.loading,
      original: <CardPageOriginalContent cardStore={cardStore} />,
      variants: [
        { state: loadingState.notFound, element: <CardNotFound /> },
        {
          state: loadingState.unknownError,
          element: <UnknownError withButton={true} />,
        },
      ],
    })

    return pageContent
  }),
  { isRootPath: true }
)
