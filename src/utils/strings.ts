export const withoutSlash = (string: string, getFirst = false): string => {
  const withoutSlash = string.split('/').filter((word) => word !== '')

  if (getFirst) {
    return withoutSlash[0]
  } else {
    return withoutSlash[withoutSlash.length - 1]
  }
}

export const normalizeString = (string: string): string => {
  return string.trim().toLowerCase()
}

type PluralizeConfig = { one: string; two: string; many: string }
export const pluralize = (config: PluralizeConfig, count: number): string => {
  const { one, two, many } = config

  if (count % 100 < 10 || count % 100 > 20) {
    if (count % 10 === 1) {
      return one
    } else if (count % 10 > 0 && count % 10 < 5) {
      return two
    } else return many
  } else {
    return many
  }
}

export const removeSkips = (string: string): string => {
  return string
    .split('')
    .filter((letter) => letter !== '_')
    .join('')
}

export const isLetter = (symbol: string): boolean => {
  return symbol.toLocaleLowerCase() !== symbol.toLocaleUpperCase()
}
export const isEnglishLetter = (letter: string): boolean => {
  return /^[a-zA-Z]+$/.test(letter)
}
export const isRussianLetter = (letter: string): boolean => {
  return /^[а-яА-ЯЁё]+$/.test(letter)
}
export const isNumber = (symbol: string): boolean => {
  return /^[0-9]$/.test(symbol)
}
export const isSpecialSymbol = (symbol: string): boolean => {
  return !isEnglishLetter(symbol) && !isRussianLetter(symbol) && !isNumber(symbol) && symbol !== ' '
}

export const getOnlyLettersFromString = (string: string): string => {
  return Array.from(string).filter(isLetter).join('')
}

export const containsEnglish = (string: string): boolean => {
  const onlyLettersArray = Array.from(getOnlyLettersFromString(string))
  return onlyLettersArray.some(isEnglishLetter)
}
export const containsRussian = (string: string): boolean => {
  const onlyLettersArray = Array.from(getOnlyLettersFromString(string))
  return onlyLettersArray.some(isRussianLetter)
}

export const onlyEnglish = (string: string): boolean => {
  const onlyLettersArray = Array.from(getOnlyLettersFromString(string))
  return onlyLettersArray.every(isEnglishLetter)
}
export const onlyRussian = (string: string): boolean => {
  const onlyLettersArray = Array.from(getOnlyLettersFromString(string))
  return onlyLettersArray.every(isRussianLetter)
}
