import React from 'react'
import { ScreenPreloader } from '../components/icons/screen-preloader'

interface StateAndElement {
  state: boolean
  element: JSX.Element
}

interface Config {
  loading?: boolean
  original: JSX.Element
  variants?: Array<StateAndElement>
}

export const content = (config: Config): JSX.Element => {
  const { loading, original, variants } = config

  if (loading) {
    return <ScreenPreloader />
  }

  let content: JSX.Element = original
  variants?.forEach(({ state, element }) => {
    if (state) {
      content = element
    }
  })

  return content
}
