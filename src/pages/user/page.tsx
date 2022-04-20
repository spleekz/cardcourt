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
    const { usersStore, createCardSlider } = useStore()
    const user = usersStore.user
    const [userCardsSliderStore, setUserCardsSliderStore] = useState<CardSlider | null>(null)

    const { userName } = useParams() as { userName: string }

    //Загружаем информацию о пользователе
    useEffect(() => {
      if (userName) {
        usersStore.loadUser(userName)
      }
    }, [userName])

    useEffect(() => {
      return () => usersStore.setUser(null)
    }, [])

    const cardWidthForSlider = 340
    const cardHeightForSlider = getCardHeightByWidth(cardWidthForSlider)

    //Если загрузили инфу и карточки пользователя - создаем слайдер
    useEffect(() => {
      if (user && !userCardsSliderStore) {
        const userCardsSliderStoreConfig: SliderConfig = {
          cards: user.cards.created,
          cardsToSlide: 3,
          cardsToShow: 3,
          cardWidth: cardWidthForSlider,
          cardHeight: cardHeightForSlider,

          initialParamsForCardRequest: {
            search: '',
            by: user.info.name,
          },

          loadCardsConfig: {
            pagesToLoad: 2,
            actionToUpdateCards: usersStore.setUserCards,
          },
          loadMoreCardsConfig: {
            pagesToLoad: 2,
            actionToUpdateCards: usersStore.pushUserCards,
          },
        }
        setUserCardsSliderStore(() => createCardSlider(userCardsSliderStoreConfig))
      }
    }, [user])

    if (usersStore.userIsLoading) {
      return <ScreenPreloader />
    }

    return (
      <>
        {user ? (
          <Container>
            <UserInfo>
              <Avatar size={480} />
              <div style={{ marginTop: '-10px' }}>
                <UserName>{user.info.name}</UserName>
                <SubscribeButton>Подписаться</SubscribeButton>
              </div>
            </UserInfo>

            {usersStore.userCardsAreFinded ? (
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
