import * as actionTypes from './actionTypes';
import {Map} from 'immutable'
export const changeClockStyle = (style) => {
    return {
        type: actionTypes.CHANGE_CLOCK_STYLE,
        style,
        meta: {
            remote: true
        }
    }
}
export const changeClockTimezone = (timezoneOffset) => {
    return {
        type: actionTypes.CHANGE_CLOCK_TIMEZONE,
        timezoneOffset,
        meta: {
            remote: true
        }
    }
}
export const changeClockPrimaryColor = (primaryColor) => {
    return {
        type: actionTypes.CHANGE_CLOCK_PRIMARY_COLOR,
        primaryColor: Map(primaryColor),
        meta: {
            remote: true
        }
    }
}
export const changeClockPrimaryColorLive = (primaryColor) => {
    return {
        type: actionTypes.CHANGE_CLOCK_PRIMARY_COLOR,
        primaryColor: Map(primaryColor)
    }
}
export const changeClockSecondaryColor = (secondaryColor) => {
    return {
        type: actionTypes.CHANGE_CLOCK_SECONDARY_COLOR,
        secondaryColor: Map(secondaryColor),
        meta: {
            remote: true
        }
    }
}
export const changeClockSecondaryColorLive = (secondaryColor) => {
    return {
        type: actionTypes.CHANGE_CLOCK_SECONDARY_COLOR,
        secondaryColor: Map(secondaryColor)
    }
}