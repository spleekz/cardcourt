import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useStore } from '../stores/root-store/context'
import { withoutSlash } from '../lib/strings'
import { Page } from '../stores/app-store'
import { observer } from 'mobx-react-lite'

export function registerPage<Props>(
  WrappedComponent: React.FC<Props>,
  isProtected = false,
  isRootPath = false
): React.FC<Props> {
  const Component: React.FC<Props> = (props) => {
    const { appStore } = useStore()
    const { pathname } = useLocation()
    const page = withoutSlash(pathname, isRootPath) || 'main'
    const tokenFromStorage = (JSON.parse(localStorage.getItem('authStore')!) as { token: string })
      .token

    useEffect(() => {
      if (page) {
        appStore.setPage(page as Page)
      }
    }, [pathname])

    return (
      <>
        {isProtected ? (
          tokenFromStorage ? (
            <WrappedComponent {...props} />
          ) : (
            <Navigate to={'/auth'} state={{ prevPath: location.pathname }} />
          )
        ) : (
          <WrappedComponent {...props} />
        )}
      </>
    )
  }
  return observer(Component)
}
