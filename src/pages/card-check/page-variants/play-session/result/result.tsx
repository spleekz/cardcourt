import React, { useState } from 'react'

import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { useCheckStore } from 'pages/card-check/original-content'

import { BlueButton } from 'components/buttons/blue-button'

import { CardCheckBlockTemplate } from '../../components/check-block-template'
import { ColoredCardName } from '../../components/shared-components'
import { usePlaySession } from '../play-session'
import { getResultEmoji } from './get-result-emoji'
import { getResultStatus } from './get-result-status'
import { getResultText } from './get-result-text'
import { ResultIncorrectWords } from './sections/incorrect-words/incorrect-words'

export const CardCheckResult: React.FC = observer(() => {
  const checkStore = useCheckStore()
  const { card } = checkStore
  const playSession = usePlaySession()

  const [resultStatus] = useState(() =>
    getResultStatus({
      correctWordsCount: playSession.correctWordsCount,
      totalWordsCount: playSession.wordsCount,
    }),
  )

  const [resultText] = useState(() =>
    getResultText({
      resultStatus,
      correctWordsCount: playSession.correctWordsCount,
      totalWordsCount: playSession.wordsCount,
    }),
  )

  const [resultEmoji] = useState(() => getResultEmoji(resultStatus))

  return (
    <CardCheckBlockTemplate width={1100} height={700}>
      <>
        <ColoredCardName cardName={card.name} cardUI={card.ui} /> — Результат {resultEmoji}
      </>
      <>
        <>{resultText}</>
        <ContentContainer>
          <Sections>{playSession.incorrectWords.length > 0 && <ResultIncorrectWords />}</Sections>
        </ContentContainer>
      </>
      <>
        <RedirectButtons>
          <StyledLink to={'/'}>
            <RedirectButton>На главную</RedirectButton>
          </StyledLink>
          <RedirectButton withMargin={true} onClick={checkStore.endPlaySession}>
            Повторить проверку
          </RedirectButton>
          <StyledLink to={`/card/${checkStore.card._id}`}>
            <RedirectButton>На страницу карточки</RedirectButton>
          </StyledLink>
        </RedirectButtons>
      </>
    </CardCheckBlockTemplate>
  )
})

const ContentContainer = styled.div``
const Sections = styled.div``
const RedirectButtons = styled.div`
  display: flex;
  justify-content: space-between;
`
const RedirectButton = styled(BlueButton)<{ withMargin?: boolean }>`
  font-size: 26px;
  margin: ${(props) => props.withMargin && `0 8px`};
  width: 300px;
  height: 60px;
`
const StyledLink = styled(Link)`
  font-size: 26px;
`
