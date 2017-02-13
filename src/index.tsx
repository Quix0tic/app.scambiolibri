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


var store = storeFactory(announcementReducer);
store.subscribe(() => {
    console.log("store changed", store.getState())
})
function checkAuth(nextState: any, replace: any) {
    const state = store.getState() as AppState;
    if (!state.logged) {
        replace({
            pathname: "login",
        });
    }
}
class Index extends React.Component<{}, {}> {
    render() {
        return (
            <Provider store={store}>
                <Router history={hashHistory}>
                    <Route path="/" component={Navbar}>
                        <IndexRoute component={Announcements} onEnter={checkAuth}/>
                        <Route path="login" component={Login} />
                        <Redirect from="*" to="/" />
                    </Route>
                </Router>
            </Provider>
        );
    }
}

render(<Index />, document.getElementById("root"));