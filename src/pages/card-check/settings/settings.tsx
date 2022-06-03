import React from 'react'

import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { BlueButton } from 'components/buttons/blue-button'

import { Lang } from 'stores/stores-utility-types'

import { CardCheckBlockTemplate } from '../check-block-template'
import { CardCheckPagesProps } from '../original-content'
import { ColoredCardName } from '../shared-components'

export const CardCheckSettings: React.FC<CardCheckPagesProps> = observer(({ checkStore }) => {
  const { card, settings } = checkStore

  return (
    <CardCheckBlockTemplate width={1100} height={550}>
      <>
        Настройте проверку для карточки <ColoredCardName card={card} />
      </>
      <>
        <CheckSettings>
          <Setting>
            <SettingTitle>Выберите язык проверки</SettingTitle>
            <CheckMode
              value={settings.langForTyping}
              onChange={(e) => settings.selectCheckMode(e.target.value as Lang)}
            >
              {settings.checkModes.map((checkMode) => {
                return (
                  <CheckModeOption value={checkMode.langForTyping} key={checkMode.langForTyping}>
                    {checkMode.label}
                  </CheckModeOption>
                )
              })}
            </CheckMode>
          </Setting>
        </CheckSettings>
      </>
      <>
        <FooterContainer>
          <StartPlaySessionButton onClick={() => checkStore.startPlaySession()}>
            Начать проверку
          </StartPlaySessionButton>
        </FooterContainer>
      </>
    </CardCheckBlockTemplate>
  )
})

const CheckSettings = styled.div`
  flex: 1 0 auto;
`
const Setting = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const SettingTitle = styled.div`
  font-size: 36px;
  text-align: center;
`
const CheckMode = styled.select`
  padding: 5px;
  font-size: 24px;
  margin: 15px 0;

  &:hover {
    cursor: pointer;
  }
`
const CheckModeOption = styled.option``
const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
`
const StartPlaySessionButton = styled(BlueButton)`
  font-size: 32px;
`
