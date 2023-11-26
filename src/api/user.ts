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

export const updateUser = async (user: User, token: Token): Promise<User> => {
    url = '/user';

    return fetch(host + url, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            Authorization: `${token.token_type} ${token.access_token}`,
        },
        body: JSON.stringify({
            role: 'user',
            email: user.email,
            name: user.name,
            surname: user.surname,
            phone: user.phone,
            city: user.city,
        }),
    }).then((responce) => {
        if (responce.status === 200) {
            return responce.json();
        }

        if (responce.status === 401) {
            updateToken();
            return updateUser(user, getTokenFromLocalStorage());
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

export const postUserAvatar = async (
    token: Token,
    image: FormData
): Promise<User> => {
    url = '/user/avatar';

    return fetch(host + url, {
        method: 'POST',
        headers: {
            Authorization: `${token.token_type} ${token.access_token}`,
        },
        body: image,
    }).then((responce) => {
        if (responce.status === 201) {
            return responce.json();
        }

        if (responce.status === 401) {
            updateToken();
            return postUserAvatar(getTokenFromLocalStorage(), image);
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

        throw new Error('Неизвестная ошибка, попробуйте позже');
    });
};

export const changePassword = async (
    oldPass: string,
    newPass: string,
    token: Token
): Promise<string> => {
    url = '/user/password';
    return fetch(host + url, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            Authorization: `${token.token_type} ${token.access_token}`,
        },
        body: JSON.stringify({
            password_1: oldPass,
            password_2: newPass,
        }),
    }).then((response) => {
        if (response.status === 200) {
            return response.json();
        }
        if (response.status === 401) {
            updateToken();
            return changePassword(oldPass, newPass, getTokenFromLocalStorage());
        }

        throw new Error('Неизвестная ошибка, попробуйте позже');
    });
};
