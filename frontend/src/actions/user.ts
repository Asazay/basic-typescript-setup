import * as UserTypes from './types.ts';
import UserService from "../services/UserService.ts";
import {Dispatch, UnknownAction} from "redux";

interface CreateUser {
    firstName : string
    lastName : string
    email : string
    username : string
    password : string
}
6
export const getUsers = () => async (_dispatch : Dispatch) : Promise<UnknownAction> => {
    try{
        const res = await UserService.getAll();

        if(res){
            _dispatch({
                type: UserTypes.GET_ALL_USERS,
                payload: res.data
            });

            return Promise.resolve(res.data)
        }

        else throw new Error('res failed')
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

export const deleteUser = (userId : number) => async (_dispatch : Dispatch) => {
    try{
        const res = await UserService.deleteUser(userId)

        if(res){
            _dispatch({
                type: UserTypes.DELETE_USER,
                payload: res.data
            });

            return Promise.resolve(res.data)
        }

        else throw new Error("Couldn't delete user")
    }
    catch (e) {
        return Promise.reject(e)
    }
}