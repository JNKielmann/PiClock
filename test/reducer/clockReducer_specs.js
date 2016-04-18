/// <reference path="../../node_modules/immutable/dist/immutable.d.ts"/>
import { Map, fromJS } from 'immutable'
import { expect } from 'chai'

import reducer, { initialState } from '../../src/reducer/clock'
import * as actionTypes from '../../src/actions/actionTypes'


describe('clock reducer', () => {

    it('should return an initial object', () => {
        const nextState = reducer(undefined, {})
        expect(nextState).to.equal(initialState)
    });

    it('should change the clock style', () => {
        const initialState = fromJS({ style: 'digital' })
        const action = { type: actionTypes.CHANGE_CLOCK_STYLE, style: 'analog' }
        const nextState = reducer(initialState, action)
        expect(nextState).to.equal(fromJS({
            style: 'analog'
        }))
    })

    it('should change the timezone offset', () => {
        const initialState = fromJS({ timezoneOffset: 0 });
        const action = { type: actionTypes.CHANGE_CLOCK_TIMEZONE, timezoneOffset: 60 };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            timezoneOffset: 60
        }))
    })
})
