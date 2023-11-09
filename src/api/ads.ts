export const host = 'http://127.0.0.1:8090';
let url = '';

export const getAllAds = async () => {
    url = `/ads`;

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
