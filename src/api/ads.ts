import { host } from '../constant';

let url = '';

export const getAllAds = async (userId: number | null) => {
    const userParam = userId ? `user_id=${userId}&` : '';
    url = `/ads?${userParam}sorting=new`;

    return fetch(host + url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    }).then((response) => {
        if (response.status === 200) {
            return response.json();
        }

        throw new Error('Ошибка...');
    });
};

export const getAdsById = async (id: string) => {
    url = `/ads/${id}`;

    return fetch(host + url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    }).then((response) => {
        if (response.status === 200) {
            return response.json();
        }

        throw new Error('Ошибка...');
    });
};

export const getAllComments = async (asdId: number) => {
    url = `/ads/${asdId}/comments`;

    return fetch(host + url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    }).then((response) => {
        if (response.status === 200) {
            return response.json();
        }

        throw new Error('Ошибка...');
    });
};
