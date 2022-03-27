import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { registerPage } from '../../hocs/register-page'
import { useStore } from '../../stores/root-store/context'
import { Avatar } from '../../components/avatar'
import { Slider } from '../../components/card-slider/slider'
import { getCardHeightByWidth } from '../../lib/cards'
import { SliderConfig, CardSlider } from '../../stores/card-slider'
import { Preloader } from '../../components/icons/preloader'

export const UserPage: React.FC = registerPage(
  observer(() => {
    const { usersStore, createCardSlider } = useStore()
    const user = usersStore.user

    const { userName } = useParams() as { userName: string }
    const [userCardsSliderStore, setUserCardsSliderStore] = useState<CardSlider | null>(null)

    useEffect(() => {
      return () => usersStore.setUser(null)
    }, [])

    //Загружаем информацию о пользователе
    useEffect(() => {
      if (userName) {
        usersStore.loadUser(userName)
      }
    }, [userName])

    const cardWidthForSlider = 340
    const cardHeightForSlider = getCardHeightByWidth(cardWidthForSlider)

    //Если загрузили инфу и карточки пользователя - создаем слайдер
    useEffect(() => {
      if (user) {
        const userCardsSliderStoreConfig: SliderConfig = {
          cards: user.cards.created,
          cardsToSlide: 3,
          cardsToShow: 3,
          cardWidth: cardWidthForSlider,
          cardHeight: cardHeightForSlider,
          loadCardsConfig: {
            params: {
              pagesToLoad: 2,
              pageSize: 3,
              by: user.info.name,
            },
            actionToUpdateCards: usersStore.setUserCards,
          },
          loadMoreCardsConfig: {
            params: {
              pagesToLoad: 2,
              pageSize: 3,
              by: user.info.name,
            },
            actionToUpdateCards: usersStore.pushUserCards,
          },
        }
        setUserCardsSliderStore(() => createCardSlider(userCardsSliderStoreConfig))
      }
    }, [user])

    if (!user) {
      return <Preloader />
    }

    return (
      <Container>
        <AvatarBlock>
          <Avatar size={480} />
          <UserInfo>
            <UserName>{user.info.name}</UserName>
            <SubscribeButton>Подписаться</SubscribeButton>
          </UserInfo>
        </AvatarBlock>
        <UserFeaturesContainer>
          <FeatureList>
            <Feature>{userCardsSliderStore && <Slider slider={userCardsSliderStore} />}</Feature>
          </FeatureList>
        </UserFeaturesContainer>
      </Container>
    )
  }),
  { isRootPath: true }
)

const Container = styled.div`
  display: flex;
  flex: 1 0 auto;
  position: relative;
`
const AvatarBlock = styled.div`
  margin-right: 65px;
  position: relative;
  align-self: flex-start;
  top: 60px;
  left: 25px;
  display: inline-block;
`
const UserInfo = styled.div`
  margin-top: -10px; ;
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
const UserFeaturesContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
`
const Feature = styled.div`
  display: inline-block;
`
