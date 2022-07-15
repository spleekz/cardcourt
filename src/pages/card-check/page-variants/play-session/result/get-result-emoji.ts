import { getRandomArrayElement } from 'utils/arrays'

import { ResultStatus } from './get-result-status'

export const getResultEmoji = (resultStatus: ResultStatus): string => {
  const failEmoji = ['🤡', '😥', '😭']
  const badEmoji = ['☹️', '😧', '👎']
  const normalEmoji = ['😐', '😶', '😕']
  const goodEmoji = ['😊', '👌', '👍']
  const excellentEmoji = ['🤩', '🤗', '😁']
  const winEmoji = ['🎉', '🥳', '🏆']

  const currentEmojiArray =
    resultStatus === 'fail'
      ? failEmoji
      : resultStatus === 'bad'
      ? badEmoji
      : resultStatus === 'normal'
      ? normalEmoji
      : resultStatus === 'good'
      ? goodEmoji
      : resultStatus === 'excellent'
      ? excellentEmoji
      : winEmoji

  return getRandomArrayElement(currentEmojiArray)
}
