import axios from 'axios';
import { AppActions } from './redux_types';

export function getAnnouncements(): AppActions {
    return ({
        type:"ANNOUNCEMENTS",
        payload: axios.get("https://api.bortolan.ml/announcements")
    })
}