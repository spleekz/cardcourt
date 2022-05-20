import React from 'react'

import { observer } from 'mobx-react-lite'

import { useStore } from 'stores/root-store/context'

import { registerPage } from 'hocs/register-page'

import { content } from 'utils/page-content'

import { ScreenPreloader } from 'assets/svg/components/screen-preloader'

import { NewCardPageOriginalContent } from './original-content'

export const NewCardPage: React.FC = registerPage(
  observer(() => {
    const { authStore, cardsStore } = useStore()

    const pageContent = content({
      loading: authStore.meLoadingState.loading,
      original: <NewCardPageOriginalContent />,
    })

    return (
      <>
        {pageContent}
        {cardsStore.cardCreatingLoadingState.loading && <ScreenPreloader />}
      </>
    )
  }),
  { isProtected: true },
)
