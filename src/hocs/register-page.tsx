import React, { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '../stores/root-store/context'
import { withoutSlash } from '../utils/strings'
import { Page } from '../stores/app-store'
import { observer } from 'mobx-react-lite'
import { useSkipForFirstEffectRun } from '../hooks/use-skip-for-first-effect-run'

interface RegisterPageOptions {
  isProtected?: boolean
  isRootPath?: boolean
}

export function registerPage<Props>(
  WrappedComponent: React.FC<Props>,
  { isProtected = false, isRootPath = false }: RegisterPageOptions = {}
): React.FC<Props> {
  const Component: React.FC<Props> = (props) => {
    const { appStore, authStore } = useStore()
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const page = withoutSlash(pathname, isRootPath) || 'main'

    const tokenFromStorage = (JSON.parse(localStorage.getItem('authStore')!) as { token: string })
      .token

    const loginPath = '/login'

    useEffect(() => {
      if (page) {
        appStore.setPage(page as Page)
      }
    }, [pathname])

    useSkipForFirstEffectRun(() => {
      if (isProtected) {
        if (!tokenFromStorage) {
          navigate(loginPath)
        }
      }
    }, [authStore.token])

    return (
      <>
        {isProtected ? (
          tokenFromStorage ? (
            <WrappedComponent {...props} />
          ) : (
            <Navigate to={loginPath} state={{ prevPath: location.pathname }} />
          )
        ) : (
          <WrappedComponent {...props} />
        )}
      </>
    )
  }
  return observer(Component)
}
