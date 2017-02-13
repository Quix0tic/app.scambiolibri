import { AxiosPromise } from 'axios';

type ApiCall<T> = {
    reqInProgress: boolean;
    data: T | null;
    reqError: string;
};

export interface Announcement {
    uuid: string
    title: string
    isbn: string
    subject: string
    edition: string
    grade: string
    notes: string
    price: number
    phone: string
    city: string
    createdAt: string
    updatedAt: string
}
export interface User {
    uuid: string;
    name: string;
    phone: string;
    city: string;
    createdAt: Date;
    updatedAt: Date;
}
export type AppState = {
    phone: string | null;
    logged: boolean;
    loginInProgress: boolean;
    logError: string;
    announcements: ApiCall<Array<Announcement>>,
    myAnnouncements: ApiCall<Array<Announcement>>
}

export interface LOGIN_REQUEST {
    type: "LOGIN";
}
export interface LOGOUT_REQUEST {
    type: "LOGIN";
}
export interface ANNOUNCEMENTS_REQUEST {
    type: "ANNOUNCEMENTS" | "ANNOUNCEMENTS_PENDING" | "ANNOUNCEMENTS_REJECTED" | "ANNOUNCEMENTS_FULFILLED";
    payload: AxiosPromise;
}

export type AppActions = LOGIN_REQUEST | LOGOUT_REQUEST | ANNOUNCEMENTS_REQUEST;