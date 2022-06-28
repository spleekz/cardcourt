import React from 'react'

import { useStore } from 'stores/root-store/context'

import { ScreenPreloader } from 'assets/svg/components/screen-preloader'

type Variant = {
  state: boolean
  element: JSX.Element
}

type Config = {
  loading?: boolean
  original: JSX.Element
  variants?: Array<Variant>
}

export const content = (config: Config): JSX.Element => {
  const { authStore } = useStore()

  const { loading, original, variants } = config

  let content: JSX.Element = original

  if (loading || (authStore.me && authStore.meLoadingState.loading)) {
    return <ScreenPreloader />
  } else {
    variants?.forEach((variant) => {
      if (variant.state) {
        content = variant.element
      }
    })
  }

  return content
}
