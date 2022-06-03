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
