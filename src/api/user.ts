import { host } from '../constant';
import { Token, User, userBack } from '../interface/global';
import { getTokenFromLocalStorage, updateToken } from '../utils/token';

let url = '';

export const registerUser = async (user: userBack) => {
    url = '/auth/register';

    return fetch(host + url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            password: user.password,
            role: user.role,
            email: user.email,
            name: user.name,
            surname: user.surname,
            phone: user.phone,
            city: user.city,
        }),
    }).then((response) => {
        if (response.status === 201) {
            return response.json();
        }
        if (response.status === 400) {
            throw new Error('Пользователь с такой почтой уже зарегистрирован');
        }
        if (response.status === 422) {
            throw new Error('Проверьте правильность заполнения полей');
        }

        throw new Error('Неизвестная ошибка, попробуйте позже');
    });
};

export const loginUser = async (email: string, password: string) => {
    url = '/auth/login';

    return fetch(host + url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    }).then((response) => {
        if (response.status === 201) {
            return response.json();
        }
        if (response.status === 401 || response.status === 422) {
            throw new Error('Проверьте логин или пароль');
        }
        throw new Error('Неизвестная ошибка, попробуйте позже');
    });
};

export const getUser = async (token: Token): Promise<User> => {
    url = '/user';

    return fetch(host + url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: `${token.token_type} ${token.access_token}`,
        },
    }).then((responce) => {
        if (responce.status === 200) {
            return responce.json();
        }

        if (responce.status === 401) {
            updateToken();
            return getUser(getTokenFromLocalStorage());
        }

        throw new Error('Неизвестная ошибка, попробуйте позже');
    });
};

export const getAllUsers = async () => {
    url = '/user/all';

    return fetch(host + url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    }).then((responce) => {
        if (responce.status === 200) {
            return responce.json();
        }

        throw new Error('Неизвестная ошибка, попробуйте позже');
    });
};

export const getNewToken = async (token: Token) => {
    url = '/auth/login';

    return fetch(host + url, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            access_token: token.access_token,
            refresh_token: token.refresh_token,
        }),
    }).then((response) => {
        if (response.status === 201) {
            return response.json();
        }
        if (response.status === 401) {
            throw new Error('Токен устарел');
        }

        throw new Error('Неизвестная ошибка, попробуйте позже');
    });
};
