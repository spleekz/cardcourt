import React, { useEffect } from 'react'

import { useMainSlider } from 'app'
import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'react-router-dom'

import { registerPage } from 'hocs/register-page'

import { content } from 'utils/page-content'

import { CardCourtPageOriginalContent } from './original-content'

export const CardCourtPage: React.FC = registerPage(
  observer(() => {
    const mainSlider = useMainSlider()
    const [searchParams] = useSearchParams()

    //поток: вводим поиск -> сетаем его в url ->
    //сетаем поиск в слайдер (если поиска нет, он заменится в слайдере на initial поиск) ->
    //слайдер изнутри грузит карточки по новому запросу
    useEffect(() => {
      const search = searchParams.get('query')
      mainSlider.setSearchAndReset(search)
    }, [searchParams])

    const pageContent = content({
      loading: mainSlider.firstLoadingState.loading,
      original: <CardCourtPageOriginalContent />,
    })

    return pageContent
  }),
)
