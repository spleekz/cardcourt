import React from 'react'
import { observer } from 'mobx-react-lite'
import { registerPage } from '../../hocs/register-page'
import { useStore } from '../../stores/root-store/context'
import { content } from '../../utils/page-content'
import { NewCardPageOriginalContent } from './original-content'

export const NewCardPage: React.FC = registerPage(
  observer(() => {
    const { authStore } = useStore()

    const pageContent = content({
      loading: authStore.meLoadingState.loading,
      original: <NewCardPageOriginalContent />,
    })

    return pageContent
  }),
  { isProtected: true }
)
