import * as actionTypes from './actionTypes'

export const changeClockStyle = (clockStyle) => ({
  type: actionTypes.CHANGE_CLOCK_STYLE,
  clockStyle,
  meta: {
    remote: true,
  },
})

export const changeClockTimezone = (timezoneOffset) => ({
  type: actionTypes.CHANGE_CLOCK_TIMEZONE,
  timezoneOffset,
  meta: {
    remote: true,
  },
})

export const changeClockPrimaryColor = (primaryColor) => ({
  type: actionTypes.CHANGE_CLOCK_PRIMARY_COLOR,
  primaryColor,
  meta: {
    remote: true,
  },
})

export const changeClockPrimaryColorLive = (primaryColor) => ({

  type: actionTypes.CHANGE_CLOCK_PRIMARY_COLOR,
  primaryColor,
  meta: {
    remote: true,
  },
})

export const changeClockSecondaryColor = (secondaryColor) => ({
  type: actionTypes.CHANGE_CLOCK_SECONDARY_COLOR,
  secondaryColor,
  meta: {
    remote: true,
  },
})

export const changeClockSecondaryColorLive = (secondaryColor) => ({
  type: actionTypes.CHANGE_CLOCK_SECONDARY_COLOR,
  secondaryColor,
  meta: {
    remote: true,
  },
})
