import React from 'react'
import { observer } from 'mobx-react-lite'
import { registerPage } from '../../hocs/register-page'
import { useStore } from '../../stores/root-store/context'
import { content } from '../../utils/page-content'
import { NewCardPageOriginalContent } from './original-content'
import { ScreenPreloader } from '../../assets/svg/components/screen-preloader'

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
  { isProtected: true }
)
