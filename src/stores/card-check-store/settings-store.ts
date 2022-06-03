import { makeAutoObservable } from 'mobx'

import { Lang } from 'stores/stores-utility-types'

interface CheckMode {
  langForTyping: Lang
  isSelected: boolean
  label: string
}
export class CardCheckSettingsStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  checkModes: Array<CheckMode> = [
    {
      langForTyping: 'en',
      isSelected: false,
      label: 'Английский',
    },
    {
      langForTyping: 'ru',
      isSelected: true,
      label: 'Русский',
    },
  ]
  selectCheckMode(modeLang: Lang): void {
    this.checkModes.forEach((checkMode) => {
      if (checkMode.langForTyping === modeLang) {
        checkMode.isSelected = true
      } else {
        checkMode.isSelected = false
      }
    })
  }

  get langForTyping(): Lang {
    const lang: Lang = this.checkModes.reduce((acc, checkMode) => {
      if (checkMode.isSelected === true) {
        acc = checkMode.langForTyping
      }
      return acc
    }, 'en' as Lang)

    return lang
  }
  get langForShowing(): Lang {
    if (this.langForTyping === 'en') {
      return 'ru'
    } else {
      return 'en'
    }
  }
}
