import { observer } from 'mobx-react-lite'
import React, { createContext, useContext } from 'react'
import { useCardStoreFromURL } from '../../hooks/use-card-store-from-url'
import { registerPage } from '../../hocs/register-page'
import { CardNotFound } from '../../components/messages/errors/card-not-found'
import { UnknownError } from '../../components/messages/errors/unknown-error'
import { content } from '../../utils/page-content'
import { EditCardPageOriginalContent } from './original-content'
import { UpdatedCardNotExists } from '../../components/messages/errors/updated-card-not-exists'
import { NotAuthorOfCard } from '../../components/messages/errors/not-author-of-card'
import { CurrentCardStore } from '../../stores/current-card-store'
import { ScreenPreloader } from '../../components/icons/screen-preloader'

const EditedCardStoreContext = createContext<CurrentCardStore>({} as CurrentCardStore)
export const useEditedCardStore = (): CurrentCardStore => useContext(EditedCardStoreContext)

export const EditCardPage: React.FC = registerPage(
  observer(() => {
    const cardStore = useCardStoreFromURL()

    const pageContent = content({
      loading: cardStore.cardLoadingState.loading,
      original: <EditCardPageOriginalContent />,
      variants: [
        {
          state: cardStore.cardLoadingState.notFound,
          element: <CardNotFound />,
        },
        {
          state: cardStore.cardUpdatingState.notFound,
          element: <UpdatedCardNotExists />,
        },
        {
          state: cardStore.cardUpdatingState.notAuthorOfCard,
          element: <NotAuthorOfCard />,
        },
        {
          state: cardStore.cardLoadingState.unknownError || cardStore.cardUpdatingState.unknownError,
          element: <UnknownError withButton={true} />,
        },
      ],
    })

    return (
      <EditedCardStoreContext.Provider value={cardStore}>
        {pageContent}
        {cardStore.cardUpdatingState.loading && <ScreenPreloader />}
      </EditedCardStoreContext.Provider>
    )
  }),
  { isProtected: true }
)
