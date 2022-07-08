import React from 'react'

import { PlayWarning } from './warning'

export const InputUnfocusedWarning: React.FC = () => {
  return <PlayWarning text={'Вы убрали фокус с поля ввода!'} />
}
