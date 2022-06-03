import { Lang } from "stores/stores-utility-types"

export function notNull<T>(value: T | null): value is T {
  return value !== null
}

export const reverseLang = (lang:Lang):Lang => {
  if(lang === 'en') {
    return 'ru'
  } else {
    return 'en'
  }
}