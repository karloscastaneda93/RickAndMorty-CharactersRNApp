import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { episodesReducer } from './episodesReducer';
import { favsReducer } from './favsReducer';
import {homeReducer} from "./homeReducer"

const rootReducer = combineReducers({
    homeReducer,
    favsReducer,
    episodesReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
});

export default store;