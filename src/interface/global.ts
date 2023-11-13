interface User {
    id: number;
    name: string;
    email: string;
    city: string;
    avatar: string;
    sells_from: string;
    phone: string;
    role: string;
    surname: string;
}

interface userBack {
    id: number;
    password: string;
    role: string;
    email: string;
    name: string;
    surname: string;
    phone: string;
    city: string;
}

interface Image {
    id: number;
    ad_id: number;
    url: string;
}

interface Ads {
    title: string;
    description: string;
    price: number;
    id: number;
    images: Image[];
    user_id: number;
    created_on: string;
    user: User;
}

interface Token {
    access_token: string;
    refresh_token: string;
    token_type: string;
}

interface Comments {
    author: User;
    created_on: string;
    id: number;
    text: string;
}

export type { Ads, Image, User, userBack, Token, Comments };
