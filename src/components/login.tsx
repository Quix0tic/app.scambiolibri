import * as React from 'react';
import { Card, CardTitle, CardText, Textfield, ProgressBar, Button } from 'react-mdl';
import { connect } from 'react-redux';
import { withRouter, browserHistory } from 'react-router';
import { AppState } from '../redux_types';
import { login } from '../api_wrapper';

interface Props {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    logged: boolean;
    logError: string;
    loginInProgress: boolean;
}

class Component extends React.Component<Props, {}>{
    componentWillUpdate(nextProps: Props, nextState: Object) {
        if (nextProps.logged) {
            browserHistory.replace("/");
        }
    }
    render() {
        return (
            <Card shadow={3} style={{ marginTop: 60, marginLeft: "auto", marginRight: "auto" }}>
                <CardTitle style={{ color: "#fff", backgroundColor: "#3f51b5" }}>Please login</CardTitle>
                <CardText>
                    {this.props.loginInProgress ? <ProgressBar indeterminate />
                        : null}
                    <form action="" onSubmit={(e) => { this.props.handleSubmit(e) }}>
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
                        <Button raised colored ripple value="login" type="submit">Log in</Button>
                    </form>
                </CardText>
            </Card >
        );
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        handleSubmit: (e: React.FormEvent<HTMLFormElement>) => {
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
