import { combineReducers } from 'redux';
import { actions } from '../actions';

const initialState = {}

export const paymentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RESET_FILTERS':
            break;
        default:
            return state;
    }