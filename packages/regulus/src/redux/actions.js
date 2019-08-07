const usersActionTypes = {
    FETCH_USER: 'FETCH_USER',
    FETCH_USER_FULFILLED: 'FETCH_USER_FULFILLED',
    FETCH_USER_CANCELLED: 'FETCH_USER_CANCELLED',
    FETCH_USER_ERROR: 'FETCH_USER_ERROR'
};

const userAction = {
    fetchUser: () => {
        return {
            type: usersActionTypes.FETCH_USER
        };
    },

    fetchUserFulfilled: payload => {
        return {
            type: usersActionTypes.FETCH_USER_FULFILLED,
            payload
        };
    },

    fetchUserCancelled: () => {
        return {
            type: usersActionTypes.FETCH_USER_CANCELLED
        };
    }
};

export const actionTypes = {
    ...usersActionTypes
};

export default {
    ...userAction
};
