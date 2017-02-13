import * as React from 'react';
import { Card, CardTitle, CardText, Textfield } from 'react-mdl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { AppState } from '../redux_types';
import { getAnnouncements } from '../api_wrapper';
import * as types from '../redux_types';
import { BasicRoute } from './BasicRouteHOC';

interface Props {
    onLoad: () => void;
    data: types.Announcement[];
    reqInProgress: boolean;
    reqError: string;
}

class Component extends React.Component<Props, {}>{
    componentDidMount() {
        if (this.props.data != null) {
            return;
        }
        this.props.onLoad();
    }
    render() {
        return (
            <h2>MAIN</h2>
        );
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        onLoad: () => {
            dispatch(getAnnouncements());
        }
    };
}

function mapStateToProps(state: AppState): any {
    return {
        reqInProgress: state.announcements.reqInProgress,
        data: state.announcements.data,
        reqError: state.announcements.reqError,
        logged: state.logged
    };
};
export const Announcements = connect(mapStateToProps, mapDispatchToProps)(BasicRoute(Component));
