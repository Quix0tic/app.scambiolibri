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
    announcements: ApiCall<Announcement[]>,
    myAnnouncements: ApiCall<Announcement[]>
}

export interface REMEMBER_LOGIN{
    type: "REMEMBER_LOGIN";
    logged: boolean;
}

export interface LOGIN_REQUEST {
    type: "LOGIN" | "LOGIN_PENDING" | "LOGIN_REJECTED" | "LOGIN_FULFILLED";

    error: boolean;
    message: string;

    name: string;
    city: string;
    updatedAt: Date;
    createdAt: Date;
}
export interface LOGOUT_REQUEST {
    type: "LOGOUT";
}
export interface ANNOUNCEMENTS_REQUEST {
    type: "ANNOUNCEMENTS" | "ANNOUNCEMENTS_PENDING" | "ANNOUNCEMENTS_REJECTED" | "ANNOUNCEMENTS_FULFILLED";
    data: string;
    reqStatus: number;
    error: string;
}

export type AppActions = LOGIN_REQUEST | LOGOUT_REQUEST | ANNOUNCEMENTS_REQUEST | REMEMBER_LOGIN;