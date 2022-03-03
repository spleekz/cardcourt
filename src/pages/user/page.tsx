import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { registerPage } from '../../hocs/register-page'
import { useStore } from '../../stores/root-store/context'
import { Avatar } from '../../components/avatar'
import { CardSlider } from '../../components/card-slider'
import { getCardHeightByWidth } from '../../lib/cards'
import { SliderConfig } from '../../stores/cards-slider-store'

export const UserPage: React.FC = registerPage(
  observer(() => {
    const { usersStore } = useStore()

    const { userName } = useParams() as { userName: string }

    useEffect(() => {
      if (userName) {
        usersStore.loadUserPublicInfo(userName)
      }
    }, [userName])

    const cardWidthForSlider = 220
    const cardHeightForSlider = getCardHeightByWidth(cardWidthForSlider)

    let userSliderConfig: SliderConfig
    if (usersStore.user.publicUserInfo !== undefined) {
      userSliderConfig = {
        cardsToSlide: 3,
        cardsToShow: 3,
        cardWidth: cardWidthForSlider,
        cardHeight: cardHeightForSlider,
        loadCardsConfig: {
          pagesToLoad: 2,
          by: usersStore.user.publicUserInfo.name,
        },
        loadMoreCardsConfig: {
          pagesToLoad: 2,
          by: usersStore.user.publicUserInfo.name,
        },
      }
    }

    return (
      <Container>
        {usersStore.isCurrentUser && (
          <>
            <AvatarBlock>
              <Avatar size={480} />
              <UserInfo>
                <UserName>{usersStore.user.publicUserInfo?.name}</UserName>
                <SubscribeButton>Подписаться</SubscribeButton>
              </UserInfo>
            </AvatarBlock>
            <UserFeatures>
              <UserCardsBlock>
                <FeatureTitle>Карточки пользователя</FeatureTitle>
                {userSliderConfig! && <CardSlider newSliderConfig={userSliderConfig} />}
              </UserCardsBlock>
            </UserFeatures>
          </>
        )}
      </Container>
    )
  }),
  { isRootPath: true }
)

const Container = styled.div`
  display: flex;
  padding: 0 50px;
`
const AvatarBlock = styled.div`
  position: relative;
  top: 75px;
  margin-right: 50px;
`
const UserInfo = styled.div`
  margin-top: -10px; ;
`
const UserName = styled.div`
  text-align: left;
  font-size: 48px;
  font-weight: bold;
  color: #fff;
`
const UserFeatures = styled.div``
const UserCardsBlock = styled.div``
const FeatureTitle = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  color: #5c5c5c;
  background-color: #ffffff;
`
const SubscribeButton = styled.button`
  margin-top: 10px;
  width: 100%;
  font-size: 28px;
  border-radius: 6px;
`
