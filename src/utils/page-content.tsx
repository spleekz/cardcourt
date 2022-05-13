import React from 'react'
import { ScreenPreloader } from '../components/icons/screen-preloader'

interface Variant {
  state: boolean
  element: JSX.Element
}

interface Config {
  loading?: boolean
  original: JSX.Element
  variants?: Array<Variant>
}

export const content = (config: Config): JSX.Element => {
  const { loading, original, variants } = config

  if (loading) {
    return <ScreenPreloader />
  }

  let content: JSX.Element = original
  variants?.forEach((variant) => {
    if (variant.state) {
      content = variant.element
    }
  })

  return content
}
