import React, { useState } from 'react'

import { observer } from 'mobx-react-lite'

import { UnknownError } from 'components/messages/errors/unknown-error'
import { NoCardsFound } from 'components/messages/info-messages/no-cards-found'
import { NoCardsOnServer } from 'components/messages/info-messages/no-cards-on-server'

import { CardSlider, SliderConfig } from 'stores/card-slider'
import { useStore } from 'stores/root-store/context'

import { content } from 'utils/page-content'

import { SliderComponent } from './slider-component'

type NewSliderConfig = {
  newSliderConfig: SliderConfig
}

type Slider = {
  slider: CardSlider
}

function CardSliderComponent(
  props: React.PropsWithChildren<NewSliderConfig>,
): React.ReactElement | null
function CardSliderComponent(props: React.PropsWithChildren<Slider>): React.ReactElement | null

function CardSliderComponent(props: NewSliderConfig | Slider): React.ReactElement | null {
  const { createCardSlider } = useStore()

  const isNewSlider = !('slider' in props)

  const [slider] = useState<CardSlider>(
    !isNewSlider ? props.slider : () => createCardSlider(props.newSliderConfig),
  )

  const sliderContent = content({
    original: <SliderComponent slider={slider} />,
    variants: [
      {
        state: !slider.cardsFound && !slider.searchingAllCards,
        element: <NoCardsFound search={slider.search} fontSize={45} />,
      },
      {
        state: !slider.cardsFound && slider.searchingAllCards,
        element: <NoCardsOnServer fontSize={45} />,
      },
      { state: slider.firstLoadingState.unknownError, element: <UnknownError withButton={false} /> },
    ],
  })

  return sliderContent
}
export const Slider = observer(CardSliderComponent)
