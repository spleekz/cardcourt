type Config = {
  correctWordsCount: number
  totalWordsCount: number
}

export type ResultStatus = 'fail' | 'bad' | 'normal' | 'good' | 'excellent' | 'win'

export const getResultStatus = ({ correctWordsCount, totalWordsCount }: Config): ResultStatus => {
  const correctWordsPercent = (correctWordsCount / totalWordsCount) * 100

  return correctWordsPercent === 0
    ? 'fail'
    : correctWordsPercent <= 30
    ? 'bad'
    : correctWordsPercent <= 50
    ? 'normal'
    : correctWordsPercent <= 80
    ? 'good'
    : correctWordsPercent < 100
    ? 'excellent'
    : 'win'
}
