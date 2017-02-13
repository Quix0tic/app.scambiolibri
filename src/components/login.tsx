import * as React from 'react';
import { Card, CardTitle, CardText, Textfield, Spinner } from 'react-mdl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { AppState } from '../redux_types';
import { login } from '../api_wrapper';

interface Props {
    handleSubmit: (e: Event) => any;
    logged: boolean;
    logError: string;
    loginInProgress: boolean;
}

class Component extends React.Component<Props, {}>{
    render() {
        return (
            <Card shadow={3} style={{ marginTop: 60, marginLeft: "auto", marginRight: "auto" }}>
                <CardTitle style={{ color: "#fff", backgroundColor: "#3f51b5" }}>Please login</CardTitle>
                <CardText>
                    {this.props.loginInProgress ? <Spinner /> : null}

                    <form action="#" onSubmit={(e) => { this.props.handleSubmit.bind(this) }}>
                        <Textfield
                            floatingLabel
                            required
                            label="Telefono"
                            type="number"
                            pattern="-?[0-9]*(\.[0-9]+)?"
                            error="Il numero di telefono inserito non è valido!"
                            id="username"
                        />

                        <Textfield
                            floatingLabel
                            required
                            label="Password"
                            type="password"
                            id="password"
                        />
                        <button
                            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored"
                            type="submit"
                            value="Login">
                            Log in</button>
                    </form>
                </CardText>
            </Card>
        );
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        handleSubmit: function (e: Event) {
            console.log("submit");
            e.preventDefault();
            dispatch(login((document.getElementById("username") as HTMLInputElement).value, (document.getElementById("password") as HTMLInputElement).value));
        }
    };
}

function mapStateToProps(state: AppState) {
    return {
        logged: state.logged,
        logError: state.logError,
        loginInProgress: state.loginInProgress
    };
}
export const Login = connect(mapStateToProps, mapDispatchToProps)(withRouter(Component));
