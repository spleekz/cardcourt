import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { registerPage } from '../../hocs/register-page'
import { Search } from './search'
import { Court } from './court/court'
import { useMainSlider } from '../../app'
import { ScreenPreloader } from '../../components/icons/screen-preloader'
import { useSearchParams } from 'react-router-dom'
import { PortalToBody } from '../../components/portal-to-body'

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

    if (mainSlider.areCardsLoading) {
      return (
        <PortalToBody>
          <ScreenPreloader />
        </PortalToBody>
      )
    }

    return (
      <Container>
        <Search />
        <Court />
      </Container>
    )
  })
)

const Container = styled.div`
  flex: 1 0 auto;
  position: relative;
  top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
