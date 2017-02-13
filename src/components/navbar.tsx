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
                    <span className="mdl-layout-title">Scambio Libri</span>
                    <div className="mdl-layout-spacer"></div>
                    <nav className="mdl-navigation mdl-layout--large-screen-only">
                        <a className="mdl-navigation__link" href="">Link</a>
                        <a className="mdl-navigation__link" href="">Link</a>
                        <a className="mdl-navigation__link" href="">Link</a>
                        <a className="mdl-navigation__link" href="">Link</a>
                    </nav>
                </div>
            </header>
            <div className="mdl-layout__drawer">
                <span className="mdl-layout-title">Scambio Libri</span>
                <nav className="mdl-navigation">
                    <a className="mdl-navigation__link" href="">Link</a>
                    <a className="mdl-navigation__link" href="">Link</a>
                    <a className="mdl-navigation__link" href="">Link</a>
                    <a className="mdl-navigation__link" href="">Link</a>
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
