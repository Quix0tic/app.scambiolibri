import * as React from 'react';
import { Grid, Cell, ListItem, ListItemContent, ListItemAction, ProgressBar, Snackbar, RippleComponent } from 'react-mdl';
import { connect } from 'react-redux';
import { AppState } from '../redux_types';
import { getAnnouncements } from '../api_wrapper';
import * as types from '../redux_types';
import { BasicRoute } from './BasicRouteHOC';
import { withRouter } from 'react-router';

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
        const mapped = (this.props.data) ? this.props.data.map((ann) =>
            <Cell key={ann.uuid} col={3} phone={12} tablet={6}>
                <ListItem twoLine >
                    <ListItemAction >€{ann.price}</ListItemAction>
                    <ListItemContent subtitle={ann.isbn} style={{ paddingLeft: 15 }}>{ann.title}</ListItemContent>
                </ListItem>
            </Cell >
        ) : null
        return (
            <div>
                {this.props.reqInProgress ? <ProgressBar indeterminate style={{width:'100%'}}/> : null}
                {this.props.reqError != "" ? <Snackbar active timeout={2000} content={this.props.reqError} onTimeout={() => { }} /> : null}
                <Grid style={{ margin: 'auto' }} >
                    {mapped}
                </Grid>
            </div>
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
export const Announcements = connect(mapStateToProps, mapDispatchToProps)(withRouter(Component));
