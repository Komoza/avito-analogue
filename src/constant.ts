export const isLogin: boolean = true;

interface User {
    city: string;
}
export interface Image {
    url: string;
}

export interface Ads {
    images: Image[];
    title: string;
    price: string;
    created_on: string;
    user: User;
}

export const checkTitleLength = (title: string) => {
    let newTitle = '';

    if (title.length > 35) {
        newTitle = title.slice(0, 35) + '...';
    } else {
        newTitle = title;
    }
    return newTitle;
};