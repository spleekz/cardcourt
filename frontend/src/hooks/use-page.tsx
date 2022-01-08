import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useStore } from '../stores/root-store/context'
import { Page } from '../stores/app-store'
import { withoutSlash } from '../lib/strings'

export const usePage = (isBasePage = false): void => {
  const { appStore } = useStore()
  const { pathname } = useLocation()

  const page = withoutSlash(pathname, isBasePage) || 'main'

  useEffect(() => {
    if (page) {
      appStore.page.set(page as Page)
    }
  }, [pathname])
}
