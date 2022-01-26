import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useStore } from '../stores/root-store/context'
import { withoutSlash } from '../lib/strings'
import { Page } from '../stores/app-store'

export function registerPage<Props>(
  WrappedComponent: React.FC<Props>,
  isProtected = false,
  isRootPath = false
): React.FC<Props> {
  const Component: React.FC<Props> = (props) => {
    const { authStore, appStore } = useStore()
    const { pathname } = useLocation()

    const page = withoutSlash(pathname, isRootPath) || 'main'

    useEffect(() => {
      if (page) {
        appStore.setPage(page as Page)
      }
    }, [pathname])

    return (
      <>
        {isProtected ? (
          authStore.token ? (
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
  return Component
}
