import { observer } from 'mobx-react-lite'
import React from 'react'
import { useCardStoreFromURL } from '../../hooks/use-card-store-from-url'
import { registerPage } from '../../hocs/register-page'
import { CardNotFound } from '../../components/messages/errors/card-not-found'
import { UnknownError } from '../../components/messages/errors/unknown-error'
import { content } from '../../utils/page-content'
import { EditCardPageOriginalContent } from './original-content'

export const EditCardPage: React.FC = registerPage(
  observer(() => {
    const cardStore = useCardStoreFromURL()
    const { card } = cardStore

    const loadingState = cardStore.cardLoadingState

    const pageContent = content({
      loading: loadingState.loading,
      original: <EditCardPageOriginalContent card={card} />,
      variants: [
        {
          state: loadingState.notFound,
          element: <CardNotFound />,
        },
        {
          state: loadingState.unknownError,
          element: <UnknownError withButton={true} />,
        },
      ],
    })

    return pageContent
  }),
  { isProtected: true }
)
