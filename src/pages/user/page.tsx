import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { registerPage } from '../../hocs/register-page'
import { useStore } from '../../stores/root-store/context'
import { Avatar } from '../../components/avatar'
import { CardSlider } from '../../components/card-slider'
import { getCardHeightByWidth } from '../../lib/cards'
import { SliderConfig, ICardsSlider } from '../../stores/cards-slider-store'

export const UserPage: React.FC = registerPage(
  observer(() => {
    const { usersStore, createCardsSliderStore } = useStore()
    const { userName } = useParams() as { userName: string }
    const [userCardsSlider, setUserCardsSlider] = useState<ICardsSlider | null>(null)

    //Загружаем информацию о пользователе
    useEffect(() => {
      if (userName) {
        usersStore.loadUserPublicInfo(userName)
      }
    }, [userName])

    //Загружаем карточки пользователя
    useEffect(() => {
      if (usersStore.user.publicInfo?.name) {
        usersStore.loadUserCards()
      }
    }, [usersStore.user.publicInfo?.name])

    const cardWidthForSlider = 340
    const cardHeightForSlider = getCardHeightByWidth(cardWidthForSlider)

    //Если загрузили инфу и карточки пользователя - создаем слайдер
    useEffect(() => {
      if (usersStore.user.publicInfo?.name && usersStore.user.publicFeatures) {
        const userCardsSliderConfig: SliderConfig = {
          cards: usersStore.user.publicFeatures.cards,
          cardsToSlide: 3,
          cardsToShow: 3,
          cardWidth: cardWidthForSlider,
          cardHeight: cardHeightForSlider,
          loadCardsConfig: {
            params: {
              pagesToLoad: 2,
              by: usersStore.user.publicInfo.name,
            },
            actionToUpdateCards: usersStore.setUserCards,
          },
          loadMoreCardsConfig: {
            params: {
              pagesToLoad: 2,
              by: usersStore.user.publicInfo.name,
            },
            actionToUpdateCards: usersStore.pushUserCards,
          },
        }
        setUserCardsSlider(() => createCardsSliderStore(userCardsSliderConfig))
      }
    }, [usersStore.user.publicInfo?.name, usersStore.user.publicFeatures])

    return (
      <Container>
        {usersStore.isCurrentUser && (
          <>
            <AvatarBlock>
              <Avatar size={480} />
              <UserInfo>
                <UserName>{usersStore.user.publicInfo?.name}</UserName>
                <SubscribeButton>Подписаться</SubscribeButton>
              </UserInfo>
            </AvatarBlock>
            <UserFeaturesContainer>
              <FeatureList>
                <Feature>{userCardsSlider && <CardSlider slider={userCardsSlider} />}</Feature>
              </FeatureList>
            </UserFeaturesContainer>
          </>
        )}
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
