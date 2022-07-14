import { ResultStatus } from './get-result-status'

export const getResultEmoji = (resultStatus: ResultStatus): string => {
  return resultStatus === 'fail'
    ? '🤡'
    : resultStatus === 'bad'
    ? '☹️'
    : resultStatus === 'normal'
    ? '😐'
    : resultStatus === 'good'
    ? '😊 '
    : resultStatus === 'excellent'
    ? '🤩'
    : '🎉'
}
