import { combineReducers } from 'redux';
import { actionTypes } from './actions';

const users = (state = [], action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER:
        case actionTypes.FETCH_USER_CANCELLED:
            return state;
        case actionTypes.FETCH_USER_FULFILLED:
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    users
});
