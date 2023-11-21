import { host } from '../constant';
import { Comments, Token } from '../interface/global';
import { getTokenFromLocalStorage, updateToken } from '../utils/token';

let url = '';

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
