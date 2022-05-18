import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { CardSlider } from '../../stores/card-slider'
import { Slider } from '../../components/card-slider/slider'
import { UserHasNoCards } from '../../components/messages/info-messages/user-has-no-cards'
import { Avatar } from '../../components/avatar'
import { CurrentUserStore } from '../../stores/current-user-store'
import { PageContentContainer } from '../../components/utility/styled'

interface Props {
  createdCardsSlider: CardSlider | null
  userStore: CurrentUserStore
}

export const UserPageOriginalContent: React.FC<Props> = observer(
  ({ userStore, createdCardsSlider }) => {
    return (
      <>
        {createdCardsSlider && (
          <Container>
            <UserInfo>
              <Avatar size={480} />
              <div style={{ marginTop: '-10px' }}>
                <UserName>{userStore.info.name}</UserName>
                <SubscribeButton>Подписаться</SubscribeButton>
              </div>
            </UserInfo>

            <PlaceForUserCardsSlider>
              {createdCardsSlider.cardsFound ? (
                <Slider slider={createdCardsSlider} />
              ) : (
                <UserHasNoCards fontSize={45} />
              )}
            </PlaceForUserCardsSlider>
          </Container>
        )}
      </>
    )
  }
)

const Container = styled(PageContentContainer)`
  display: flex;
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
const PlaceForUserCardsSlider = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
