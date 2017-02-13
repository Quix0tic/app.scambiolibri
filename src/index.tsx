import * as React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { Navbar } from './components/navbar';
import { Login } from './components/login';
import { storeFactory, announcementReducer } from './redux_store';

var store = storeFactory(announcementReducer);
store.subscribe(() => {
    console.log("store changed", store.getState())
})

class Index extends React.Component<{}, {}> {
    render() {
        return (
            <Provider store={store}>
                <Router history={hashHistory}>
                    <Route path="/" component={Navbar}>
                        <IndexRoute component={Login} />
                        <Redirect from="*" to="/" />
                    </Route>
                </Router>
            </Provider>
        );
    }
}

render(<Index />, document.getElementById("root"));