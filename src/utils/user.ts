import { userBack } from '../interface/global';

export function saveUserToLocalStorage(user: userBack) {
    localStorage.setItem('user', JSON.stringify(user));
}

export function getUserFromLocalStorage(): userBack | null {
    const userString = window.localStorage.getItem('user');
    return userString ? (JSON.parse(userString) as userBack) : null;
}

export function removeUserFromLocalStorage() {
    window.localStorage.removeItem('user');
}
