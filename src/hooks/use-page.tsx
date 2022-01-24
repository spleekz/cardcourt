import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '../stores/root-store/context'
import { Page } from '../stores/app-store'
import { withoutSlash } from '../lib/strings'

export const usePage = (isPrivate: boolean, isRootPath = false): void => {
  const { authStore, appStore } = useStore()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const page = withoutSlash(pathname, isRootPath) || 'main'

  useEffect(() => {
    if (page) {
      appStore.page.set(page as Page)
    }
  }, [pathname])

  useEffect(() => {
    if (isPrivate) {
      if (!authStore.token) {
        navigate('/auth')
      }
    }
  }, [authStore.token])
}
