import { default as React, Component } from 'react';
import { render } from 'react-dom';

class Index extends Component<{},{}> {
    render(){
        return(
            <h1>Ciao</h1>
        );
    }
}

render(<Index/>, document.getElementById("root"));