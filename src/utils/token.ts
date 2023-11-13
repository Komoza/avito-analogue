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

export const updateToken = async () => {
    try {
        const token: Token = getTokenFromLocalStorage();
        const data = await getNewToken(token);
        saveTokenToLocalStorage(data);
    } catch (error) {
        throw new Error(`Ошибка при обновлении токена:`);
    }
};
