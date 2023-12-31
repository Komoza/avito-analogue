import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FullTagDescription } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { host } from '../constant';
import { Ads, Token } from '../interface/global';

const DATA_TAG: FullTagDescription<never> = {
    type: null as never,
    id: 'LIST',
};

interface PostAdsProps {
    token: Token;
    ads: {
        title: string;
        description: string;
        price: number;
    };
}

interface UpdateAdsProps {
    ads: {
        id: number;
        title: string;
        description: string;
        price: number | null;
    };
    token: Token;
}

interface PostAdsImageProps {
    token: Token;
    image: FormData;
    adsId: number;
}

interface DeleteAdsImageProps {
    token: Token;
    imageUrl: string;
    adsId: number;
}

export const advertisementApi = createApi({
    reducerPath: 'adsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: host,
    }),
    endpoints: (builder) => ({
        getAllAds: builder.query<Ads[], void>({
            query: () => '/ads?sorting=new',
            providesTags: [DATA_TAG],
        }),

        getAllAdsByUserId: builder.query<Ads[], number>({
            query: (userId) => `/ads?user_id=${userId}&sorting=new`,
            providesTags: [DATA_TAG],
        }),

        getAdsById: builder.query<Ads, number>({
            query: (id) => `/ads/${id}`,
            providesTags: [DATA_TAG],
        }),

        postAds: builder.mutation<Ads, PostAdsProps>({
            query: (postAdsProps) => ({
                url: '/adstext',
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `${postAdsProps.token.token_type} ${postAdsProps.token.access_token}`,
                },
                body: JSON.stringify(postAdsProps.ads),
            }),
            invalidatesTags: [DATA_TAG],
        }),

        deleteAdsById: builder.mutation<void, { id: string; token: Token }>({
            query: ({ id, token }) => ({
                url: `ads/${id}`,
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `${token.token_type} ${token.access_token}`,
                },
            }),
            invalidatesTags: [DATA_TAG],
        }),

        updateAdsById: builder.mutation<Ads, UpdateAdsProps>({
            query: ({ ads, token }) => ({
                url: `/ads/${ads.id}`,
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
            }),
            invalidatesTags: [DATA_TAG],
        }),

        postAdsImage: builder.mutation<Ads, PostAdsImageProps>({
            query: ({ token, image, adsId }) => ({
                url: `/ads/${adsId}/image`,
                method: 'POST',
                headers: {
                    Authorization: `${token.token_type} ${token.access_token}`,
                },
                body: image,
            }),
            invalidatesTags: [DATA_TAG],
        }),

        deleteAdsImage: builder.mutation<Ads, DeleteAdsImageProps>({
            query: ({ token, imageUrl, adsId }) => ({
                url: `/ads/${adsId}/image?file_url=${imageUrl.replace(
                    host + '/',
                    ''
                )}`,
                method: 'DELETE',
                headers: {
                    Authorization: `${token.token_type} ${token.access_token}`,
                },
            }),
            invalidatesTags: [DATA_TAG],
        }),
    }),
});

export const {
    useGetAllAdsQuery,
    useGetAllAdsByUserIdQuery,
    useGetAdsByIdQuery,
    usePostAdsMutation,
    useDeleteAdsByIdMutation,
    useUpdateAdsByIdMutation,
    usePostAdsImageMutation,
    useDeleteAdsImageMutation,
} = advertisementApi;
