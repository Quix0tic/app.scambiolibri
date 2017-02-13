import * as React from "react";
import { withRouter } from "react-router";

import * as types from "../redux_types";

export function BasicRoute(Base: React.ComponentClass<any>): any {
    class Component extends Base {
        componentWillUpdate() {
            if (!this.props.logged) {
                this.props.router.push("/login");
            }
        }
    }
    return withRouter(Component);
}
