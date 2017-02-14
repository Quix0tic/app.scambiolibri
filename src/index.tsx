import * as React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';

import { Navbar } from './components/navbar';
import { Login } from './components/login';
import { Announcements } from './components/announcements';
import { storeFactory, announcementReducer } from './redux_store';
import { AppState } from './redux_types';
import { AppStorage, LOGGED_KEY } from "./app_storage";

var store = storeFactory(announcementReducer);

// Setting up the localStorage and checking if the user is already logged
// Create the key if it isn't in the storage
if (AppStorage.getItem(LOGGED_KEY) == null) {
    AppStorage.setItem(LOGGED_KEY, "false");
} else {
    const logged = AppStorage.getItem(LOGGED_KEY) === "true";
    store.dispatch({ type: "REMEMBER_LOGIN", logged: logged });
}

function checkAuth(nextState: any, replace: any) {
    const state = store.getState() as AppState;
    if (!state.logged) {
        replace({
            pathname: "login",
        });
    }
}
function notLoggedIn(nextState: any, replace: any) {
    const state = store.getState() as AppState;
    if (state.logged) {
        replace({
            pathname: "",
        });
    }
}
function logout(nextState: any, replace: any) {
    store.dispatch({ type: "LOGOUT" });
    replace({
        pathname: "login",
    });
}

class Index extends React.Component<{}, {}> {
    render() {
        return (
            <Provider store={store}>
                <Router history={hashHistory}>
                    <Route path="/" component={Navbar}>
                        <IndexRoute component={Announcements} onEnter={checkAuth} />
                        <Route path="logout" onEnter={logout} />
                        <Route path="login" component={Login} onEnter={notLoggedIn} />
                        <Redirect from="*" to="/" />
                    </Route>
                </Router>
            </Provider>
        );
    }
}

render(<Index />, document.getElementById("root"));