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
    }),
});

export const {
    useGetAllAdsQuery,
    usePostAdsMutation,
    useDeleteAdsByIdMutation,
} = advertisementApi;
