import axios from 'axios';
import { AppActions } from './redux_types';

export function getAnnouncements() {
    return ({
        type: "ANNOUNCEMENTS",
        payload: axios.get("https://api.bortolan.ml/announcements", { withCredentials: true })
    })
}
export function getUserannouncements() {
    return ({
        type: "MY_ANNOUNCEMENS",
        payload: axios.get("https://api.bortolan.ml/user/announcements", { withCredentials: true })
    })
}
export function login(phone: string, password: string) {
    return ({
        type: "LOGIN",
        payload: axios.post("https://api.bortolan.ml/login", { phone: phone, password: password }, { withCredentials: true })
    })
}