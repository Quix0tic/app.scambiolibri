import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { AppState } from '../redux_types';

interface Props {
    children: any;
}

const component = function (props: Props) {
    return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">
                    <Link className="mdl-navigation__link mdl-layout-title" to="/">Scambio Libri</Link>
                    <div className="mdl-layout-spacer"></div>
                    <nav className="mdl-navigation mdl-layout--large-screen-only">
                        <a className="mdl-navigation__link" href="">Link</a>
                        <a className="mdl-navigation__link" href="">Link</a>
                        <a className="mdl-navigation__link" href="">Link</a>
                        <Link className="mdl-navigation__link" to="/logout"><i className="material-icons">power_settings_new</i></Link>
                    </nav>
                </div>
            </header>
            <div className="mdl-layout__drawer">
                <span className="mdl-layout-title">Scambio Libri</span>
                <nav className="mdl-navigation">
                    <a className="mdl-navigation__link" href="">Link</a>
                    <a className="mdl-navigation__link" href="">Link</a>
                    <a className="mdl-navigation__link" href="">Link</a>
                    <Link className="mdl-navigation__link" to="/logout"><i className="material-icons">power_settings_new</i> LOGOUT</Link>
                </nav>
            </div>
            <main className="mdl-layout__content">
                {props.children}
            </main>
        </div>
    );
}

function mapDispatchToProps(dispatch: any) {
    return {};
}

function mapStateToProps(state: AppState) {
    return {};
}

export const Navbar = connect(mapStateToProps, mapDispatchToProps)(component);
