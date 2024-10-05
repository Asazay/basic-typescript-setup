import * as UserTypes from '../actions/types.ts'
import {UnknownAction} from "redux";

const initialState = {};

function userReducer(user = initialState, action : UnknownAction) {
    const { type, payload } = action;

    switch (type) {
        case UserTypes.CREATE_USER:
            return {user: payload};

        case UserTypes.GET_ALL_USERS:
            return {user: payload};

        case UserTypes.UPDATE_USER:
            return {user: payload};

        case UserTypes.DELETE_USER:
            return {user: null};

        default:
            return user;
    }
};

export default userReducer;