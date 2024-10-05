import * as UserTypes from '../actions/types.ts'
import {Action} from "redux";

const initialState = {};
interface IncludePayload extends Action {
    payload?: object | Array<any>
}

function userReducer(user = initialState, action : IncludePayload) {
    const { type, payload } = action;

    switch (type) {
        case UserTypes.CREATE_USER:
            let addedUser = {...user}
             // @ts-ignore
            addedUser[payload.id] = payload
            return addedUser;

        case UserTypes.GET_ALL_USERS:
            let users = {}
            // @ts-ignore
            payload.forEach(user => users[user.id] = user)
            return users;

        case UserTypes.UPDATE_USER:
            return {user: payload};

        case UserTypes.DELETE_USER:
            let newUser = {...user}
            // @ts-ignore
            delete newUser[payload.id]
            return newUser;

        default:
            return user;
    }
};

export default userReducer;