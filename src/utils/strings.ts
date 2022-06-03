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
