import { createStore, combineReducers, applyMiddleware } from 'redux';
import { default as promiseMiddleware } from 'redux-promise-middleware';
import { default as thunk } from 'redux-thunk';
import createLogger = require('redux-logger');

import { AppStorage, LOGGED_KEY } from "./app_storage";
import { AppState, AppActions, Announcement } from './redux_types';

const initialState: AppState = {
    phone: null,
    logged: false,
    loginInProgress: false,
    logError: "",
    announcements: {
        reqInProgress: false,
        data: null,
        reqError: ""
    },
    myAnnouncements: {
        reqInProgress: false,
        data: null,
        reqError: ""
    },
}

type Reducer = (state: AppState, action: AppActions) => AppState;

const middleware = applyMiddleware(thunk, promiseMiddleware(), (createLogger as any)());

export function storeFactory(reducer: Reducer) {
    return createStore<AppState>(reducer, middleware);
}
function handleApiResponse<T>(reqStatus: number, reqData: any, state: AppState, fieldToUpdate: string) {
    if (reqStatus === 200) {
        let parsedData: T;
        try {
            parsedData = JSON.parse(reqData);
        } catch (e) {
            return { ...state, [fieldToUpdate]: { reqInProgress: false, reqError: "Error parsing data" } };
        }
        return { ...state, [fieldToUpdate]: { reqInProgress: false, reqError: "" } };
    } else if (reqStatus === 403) {
        return { ...state, [fieldToUpdate]: { reqInProgress: false, reqError: "You need to login again" }, logged: false };
    } else {
        return { ...state, [fieldToUpdate]: { reqInProgress: false, reqError: "Error fetching data" } };
    }
}
export function announcementReducer(state = initialState, action: any): AppState {
    switch (action.type) {
        case "ANNOUNCEMENTS_PENDING":
            return {
                ...state, announcements: {
                    reqInProgress: true,
                    data: null,
                    reqError: ""
                }
            }
        case "ANNOUNCEMENTS_FULFILLED":
            return {
                ...state, announcements: {
                    reqInProgress: false,
                    data: action.payload.data,
                    reqError: ""
                }
            }
        case "ANNOUNCEMENTS_REJECTED":
            return {
                ...state, announcements: {
                    reqInProgress: false,
                    data: null,
                    reqError: action.error
                }
            }
        case "LOGOUT":
            AppStorage.setItem(LOGGED_KEY, "false");
            return { ...state, logged: false };
        case "LOGIN_PENDING":
            return { ...state, loginInProgress: true }
        case "LOGIN_FULFILLED":
            AppStorage.setItem(LOGGED_KEY, action.error ? "false" : "true");
            return { ...state, loginInProgress: false, logged: !action.error }
        case "LOGIN_REJECTED":
            AppStorage.setItem(LOGGED_KEY, action.error ? "false" : "true");
            return { ...state, loginInProgress: false, logged: false, logError: action.message }
        case "REMEMBER_LOGIN":
            return { ...state, logged: action.logged }
    }
    return state;
}