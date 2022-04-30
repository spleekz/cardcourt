import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { registerPage } from '../../hocs/register-page'
import { useStore } from '../../stores/root-store/context'
import { Avatar } from '../../components/avatar'
import { Slider } from '../../components/card-slider/slider'
import { getCardHeightByWidth } from '../../utils/cards'
import { SliderConfig, CardSlider } from '../../stores/card-slider'
import { ScreenPreloader } from '../../components/icons/screen-preloader'
import { UserErrorMessage } from './error-message'

export const UserPage: React.FC = registerPage(
  observer(() => {
    const { createCurrentUserStore, createCardSlider } = useStore()

    const { userName } = useParams() as { userName: string }
    const [userStore] = useState(() => createCurrentUserStore(userName))
    const [userCardsSliderStore, setUserCardsSliderStore] = useState<CardSlider | null>(null)

    const cardWidthForSlider = 340
    const cardHeightForSlider = getCardHeightByWidth(cardWidthForSlider)

    //Если пользователь существует и загрузился - создаём слайдер
    useEffect(() => {
      if (userStore.userLoadingState === 'success') {
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
        setUserCardsSliderStore(() => createCardSlider(userCardsSliderStoreConfig))
      }
    }, [userStore.userLoadingState])

    if (userStore.userLoadingState === 'loading') {
      return <ScreenPreloader />
    }

    return (
      <>
        {userStore.userLoadingState === 'success' ? (
          <Container>
            <UserInfo>
              <Avatar size={480} />
              <div style={{ marginTop: '-10px' }}>
                <UserName>{userStore.info.name}</UserName>
                <SubscribeButton>Подписаться</SubscribeButton>
              </div>
            </UserInfo>

            {userStore.userCreatedCardsAreFinded ? (
              <UserCardsSlider>
                {userCardsSliderStore && <Slider slider={userCardsSliderStore} />}
              </UserCardsSlider>
            ) : (
              <UserErrorMessage text='У пользователя нет карточек' />
            )}
          </Container>
        ) : (
          <UserErrorMessage text='Пользователь не найден' />
        )}
      </>
    )
  }),
  { isRootPath: true }
)

const Container = styled.div`
  display: flex;
  flex: 1 0 auto;
  position: relative;
`
const UserInfo = styled.div`
  margin-right: 65px;
  position: relative;
  align-self: flex-start;
  top: 60px;
  left: 25px;
  display: inline-block;
`
const UserName = styled.div`
  text-align: left;
  font-size: 48px;
  font-weight: bold;
  margin-top: -4px;
  color: #ffffff;
`
const SubscribeButton = styled.button`
  margin-top: 10px;
  width: 100%;
  font-size: 28px;
  border-radius: 6px;
`
const UserCardsSlider = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
