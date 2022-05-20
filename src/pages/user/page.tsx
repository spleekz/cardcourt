import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react-lite'

import { UnknownError } from 'components/messages/errors/unknown-error'
import { UserNotFound } from 'components/messages/errors/user-not-found'

import { CardSlider, SliderConfig } from 'stores/card-slider'
import { useStore } from 'stores/root-store/context'

import { useUserStoreFromUrl } from 'hooks/use-user-store-from-url'

import { registerPage } from 'hocs/register-page'

import { getCardHeightByWidth } from 'utils/cards'
import { content } from 'utils/page-content'

import { UserPageOriginalContent } from './original-content'

export const UserPage: React.FC = registerPage(
  observer(() => {
    const userStore = useUserStoreFromUrl()
    const { userLoadingState } = userStore

    const { createCardSlider } = useStore()
    const [userCreatedCardsSliderStore, setUserCreatedCardsSliderStore] = useState<CardSlider | null>(
      null,
    )
    const cardWidthForSlider = 340
    const cardHeightForSlider = getCardHeightByWidth(cardWidthForSlider)

    //Если пользователь существует и загрузился - создаём слайдер
    useEffect(() => {
      if (userStore.userLoadingState.success) {
        const userCardsSliderStoreConfig: SliderConfig = {
          cards: userStore.cards.created,
          cardsToSlide: 3,
          cardsToShow: 3,
          cardWidth: cardWidthForSlider,
          cardHeight: cardHeightForSlider,

          initialParamsForCardRequest: {
            search: '',
            by: userStore.info.name,
          },

          loadCardsConfig: {
            pagesToLoad: 2,
          },
          loadMoreCardsConfig: {
            pagesToLoad: 2,
          },
        }
        setUserCreatedCardsSliderStore(() => createCardSlider(userCardsSliderStoreConfig))
      }
    }, [userStore.userLoadingState.success])

    const pageContent = content({
      loading: userStore.userLoadingState.loading,
      original: (
        <UserPageOriginalContent
          userStore={userStore}
          createdCardsSlider={userCreatedCardsSliderStore}
        />
      ),
      variants: [
        { state: userLoadingState.notFound, element: <UserNotFound userName={userStore.info.name} /> },
        { state: userLoadingState.unknownError, element: <UnknownError withButton={true} /> },
      ],
    })

    return pageContent
  }),
  { isRootPath: true },
)
