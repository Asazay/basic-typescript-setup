import {compose, configureStore, Tuple} from '@reduxjs/toolkit'
import logger from 'redux-logger';
import {thunk} from 'redux-thunk';

import sessionReducer from '../redux/session'

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

let applyMw;

if(process.env.NODE_ENV === 'production'){
    applyMw = (_gdm: any) => new Tuple(thunk)
}

else applyMw = (_gdm: any) => new Tuple(thunk, logger)

const configStore = configureStore({
    reducer: sessionReducer,
    middleware: getDefaultMiddleware => applyMw(getDefaultMiddleware)
})

export default configStore;