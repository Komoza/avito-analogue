import { host } from '../constant';
import { Ads, Comments, Token } from '../interface/global';
import { getTokenFromLocalStorage, updateToken } from '../utils/token';

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

export const deleteAdsById = async (
    id: string,
    token: Token
): Promise<void> => {
    url = `/ads/${id}`;

    return fetch(host + url, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            Authorization: `${token.token_type} ${token.access_token}`,
        },
    }).then((response) => {
        if (response.status === 200) {
            return response.json();
        }
        if (response.status === 401) {
            updateToken();
            return deleteAdsById(id, getTokenFromLocalStorage());
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

export const postComments = async (
    asdId: number,
    commentText: string,
    token: Token
): Promise<Comments> => {
    url = `/ads/${asdId}/comments`;

    return fetch(host + url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `${token.token_type} ${token.access_token}`,
        },
        body: JSON.stringify({
            text: commentText,
        }),
    }).then((response) => {
        if (response.status === 201) {
            return response.json();
        }

        if (response.status === 401) {
            updateToken();
            return postComments(asdId, commentText, getTokenFromLocalStorage());
        }

        throw new Error('Ошибка...');
    });
};

export const postAds = async (
    ads: {
        title: string;
        description: string;
        price: number;
    },
    token: Token,
    images: FormData[]
): Promise<Ads> => {
    url = `/ads?title=${ads.title}&description=${ads.description}&price=${ads.price}`;
    return fetch(host + url, {
        method: 'POST',
        headers: {
            Authorization: `${token.token_type} ${token.access_token}`,
        },
        body: JSON.stringify(images),
    }).then((response) => {
        if (response.status === 201) {
            return response.json();
        }

        if (response.status === 401) {
            updateToken();
            return postAds(ads, getTokenFromLocalStorage(), images);
        }

        throw new Error('Ошибка...');
    });
};

export const updateAds = async (
    ads: {
        id: number;
        title: string;
        description: string;
        price: number | null;
    },
    token: Token
): Promise<Ads> => {
    url = `/ads/${ads.id}`;
    return fetch(host + url, {
        method: 'PATCH',
        headers: {
            Authorization: `${token.token_type} ${token.access_token}`,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            title: ads.title,
            description: ads.description,
            price: ads.price,
        }),
    }).then((response) => {
        if (response.status === 200) {
            return response.json();
        }

        if (response.status === 401) {
            updateToken();
            return updateAds(ads, getTokenFromLocalStorage());
        }

        throw new Error('Ошибка...');
    });
};

export const postAdsText = async (
    ads: {
        title: string;
        description: string;
        price: number;
    },
    token: Token
): Promise<Ads> => {
    url = '/adstext';
    return fetch(host + url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `${token.token_type} ${token.access_token}`,
        },
        body: JSON.stringify(ads),
    }).then((response) => {
        if (response.status === 201) {
            return response.json();
        }

        if (response.status === 401) {
            updateToken();
            return postAdsText(ads, getTokenFromLocalStorage());
        }

        throw new Error('Ошибка...');
    });
};

export const postAdsImage = async (
    token: Token,
    image: FormData,
    adsId: number
): Promise<Ads> => {
    url = `/ads/${adsId}/image`;

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
            return postAdsImage(getTokenFromLocalStorage(), image, adsId);
        }
        throw new Error('Неизвестная ошибка, попробуйте позже');
    });
};
