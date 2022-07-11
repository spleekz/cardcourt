import React from 'react'

import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { BlueButton } from 'components/buttons/blue-button'

import { CheckDifficultyValue } from 'stores/card-check-store/settings-store'
import { Lang } from 'stores/stores-utility-types'

import { CardCheckPagesProps } from '../../original-content'
import { CardCheckBlockTemplate } from '../components/check-block-template'
import { ButtonWithArrowLeft, ColoredCardName } from '../components/shared-components'

export const CardCheckSettings: React.FC<CardCheckPagesProps> = observer(({ checkStore }) => {
  const { card, settings } = checkStore

  return (
    <CardCheckBlockTemplate width={1100} height={550}>
      <>
        <GoToCardBlock>
          <Link to={`/card/${card._id}`}>
            <ButtonWithArrowLeft title='Перейти на карточку' />
          </Link>
        </GoToCardBlock>
        <Title>
          Настройте проверку для карточки <ColoredCardName cardName={card.name} cardUI={card.ui} />
        </Title>
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
            <Setting>
              <SettingTitle>Выберите сложность</SettingTitle>
              <CheckDifficulty
                value={settings.difficulty}
                onChange={(e) => settings.setCheckDifficulty(e.target.value as CheckDifficultyValue)}
              >
                {settings.checkDifficulties.map((difficulty) => {
                  return (
                    <CheckDifficultyOption key={difficulty.value} value={difficulty.value}>
                      {difficulty.label}
                    </CheckDifficultyOption>
                  )
                })}
              </CheckDifficulty>
            </Setting>
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
const GoToCardBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 25px;
  top: 0;
  bottom: 0;
`
const Title = styled.div``
const Setting = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const SettingTitle = styled.div`
  font-size: 36px;
  text-align: center;
`
const CheckSettingSelect = styled.select`
  padding: 5px;
  font-size: 24px;
  margin: 15px 0;

  &:hover {
    cursor: pointer;
  }
`
const CheckSettingOption = styled.option``
const CheckMode = styled(CheckSettingSelect)``
const CheckModeOption = styled(CheckSettingOption)``
const CheckDifficulty = styled(CheckSettingSelect)``
const CheckDifficultyOption = styled(CheckSettingOption)``
const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
`
const StartPlaySessionButton = styled(BlueButton)`
  font-size: 32px;
`
