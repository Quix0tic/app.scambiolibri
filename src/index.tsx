import * as React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { Navbar } from './components/navbar';

class Index extends React.Component<{}, {}> {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Navbar}>

                </Route>
            </Router>
        );
    }
}

render(<Index />, document.getElementById("root"));