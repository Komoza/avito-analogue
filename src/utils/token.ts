import { getNewToken } from '../api/user';
import { Token } from '../interface/global';

export const saveTokenToLocalStorage = (token: string) => {
    localStorage.setItem('token', JSON.stringify(token));
};

export const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
};

export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('token');
};

export const updateToken = () => {
    const token: Token = getTokenFromLocalStorage();
    getNewToken(token).then((data) => {
        saveTokenToLocalStorage(data);
    });
};
