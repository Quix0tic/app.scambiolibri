import { createStore, combineReducers, applyMiddleware } from 'redux';
import { default as promiseMiddleware } from 'redux-promise-middleware';
import { default as thunk } from 'redux-thunk';

import { AppStorage, LOGGED_KEY, PHONE_KEY } from "./app_storage";
import { AppState, AppActions, Announcement } from './redux_types';

const initialState: AppState = {
    phone: AppStorage.getItem(PHONE_KEY),
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

const middleware = applyMiddleware(thunk, promiseMiddleware());

/*combineReducers({
    announcements: announcementReducer,
    myAnnouncements: announcementReducer,
    reducer
})*/

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
export function announcementReducer(state = initialState, action: AppActions): AppState {
    switch (action.type) {
        case "ANNOUNCEMENTS_PENDING":

            console.log("ANNOUNCEMENTS_PENDING");
            break;
        case "ANNOUNCEMENTS_FULFILLED":
            console.log("ANNOUNCEMENTS_FULFILLED");
            break;
        case "ANNOUNCEMENTS_REJECTED":
            console.log("ANNOUNCEMENTS_REJECTED");
            break;
        case "LOGIN_PENDING":
            break;
        case "LOGIN_FULFILLED":
            break;
        case "LOGIN_REJECTED":
            break;
    }
    return state;
}