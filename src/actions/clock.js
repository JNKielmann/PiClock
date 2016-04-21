import * as actionTypes from './actionTypes'
import { Map } from 'immutable'

export const changeClockStyle = (style) => ({
  type: actionTypes.CHANGE_CLOCK_STYLE,
  style,
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
  primaryColor: new Map(primaryColor),
  meta: {
    remote: true,
  },
})

export const changeClockPrimaryColorLive = (primaryColor) => ({

  type: actionTypes.CHANGE_CLOCK_PRIMARY_COLOR,
  primaryColor: new Map(primaryColor),
})

export const changeClockSecondaryColor = (secondaryColor) => ({
  type: actionTypes.CHANGE_CLOCK_SECONDARY_COLOR,
  secondaryColor: new Map(secondaryColor),
  meta: {
    remote: true,
  },
})

export const changeClockSecondaryColorLive = (secondaryColor) => ({
  type: actionTypes.CHANGE_CLOCK_SECONDARY_COLOR,
  secondaryColor: new Map(secondaryColor),
})
