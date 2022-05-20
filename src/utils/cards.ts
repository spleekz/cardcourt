import cardConfig from 'stores/card-config.json'

const widthToHeight = cardConfig.width / cardConfig.height
const heightToWidth = cardConfig.height / cardConfig.width

export const getCardWidthByHeight = (height: number): number => {
  return height * widthToHeight
}
export const getCardHeightByWidth = (width: number): number => {
  return width * heightToWidth
}
