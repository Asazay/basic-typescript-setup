import * as UserTypes from './types.ts';
import UserService from "../services/UserService.ts";
import {Dispatch} from "redux";

interface CreateUser {
    firstName : string
    lastName : string
    email : string
    username : string
    password : string
}
6
export const getUsers = () => async (_dispatch : Dispatch) : Promise<any> => {
    try{
        const res = await UserService.getAll();

        if(res){
            _dispatch({
                type: UserTypes.GET_ALL_USERS,
                payload: res.data
            });

            return Promise.resolve(res.data)
        }
    }
    catch (e) {
        return Promise.reject(e)
    }
}

export const createUser = (_data : CreateUser) => async (_dispatch : Dispatch) => {
    try{
        const res = await UserService.create(_data);

        if(res){
            _dispatch({
                type: UserTypes.CREATE_USER,
                payload: res.data
            });

            return Promise.resolve(res.data)
        }
    }
    catch (e) {
        return Promise.reject(e)
    }
}