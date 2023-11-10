import { host } from '../constant';
import { userBack } from '../interface/global';

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
        if ((response.status === 401) || (response.status === 422)) {
            throw new Error('Проверьте логин или пароль');
        }
        throw new Error('Неизвестная ошибка, попробуйте позже');
    });
};
