import { Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width

const CARD_BORDER_RADIUS_RATIO = 16
const CARD_ASPECT_RATIO = 0.875

export const getIntroductionCardWidth = () => screenWidth * 0.7
export const getIntroductionCardHeight = () =>
  Math.round(getIntroductionCardWidth() / CARD_ASPECT_RATIO)
export const getIntroductionCardBorderRadius = () =>
  Math.round(getIntroductionCardHeight() / CARD_BORDER_RADIUS_RATIO)
