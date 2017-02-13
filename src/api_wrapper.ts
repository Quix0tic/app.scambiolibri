import axios from 'axios';
import { AppActions } from './redux_types';

export function getAnnouncements() {
    return function (dispatch: any) {
        axios.get("https://api.bortolan.ml/announcements")
            .then((response) => {
                dispatch({ type: "ANNOUNCEMENTS_FULFILLED", reqStatus: response.status, data: response.data })
            })
            .catch((error) => {
                dispatch({ type: "ANNOUNCEMENTS_FULFILLED", data: error })
            })
    }
}