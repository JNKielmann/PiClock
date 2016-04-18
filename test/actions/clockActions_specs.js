import {Map, fromJS} from 'immutable';
import { expect } from 'chai';

import * as clockActions from '../../src/actions/clock';
import * as actionTypes from '../../src/actions/actionTypes';

describe('clock actions', () => {
    it('should create an action to change the style to analog', () => {
        const expectedAction = {
            type: actionTypes.CHANGE_CLOCK_STYLE,
            style: 'analog'
        }
        expect(clockActions.changeClockStyle('analog')).to.deep.equal(expectedAction);
    })
    
    it('should create an action to change the timezone', () => {
        const expectedAction = {
            type: actionTypes.CHANGE_CLOCK_TIMEZONE,
            timezoneOffset: 60
        }
        expect(clockActions.changeClockTimezone(60)).to.deep.equal(expectedAction);
    })
})