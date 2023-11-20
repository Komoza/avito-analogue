import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FullTagDescription } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { host } from '../constant';
import { Ads } from '../interface/global';

const DATA_TAG: FullTagDescription<never> = {
    type: null as never,
    id: 'LIST',
};

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
    }),
});

export const { useGetAllAdsQuery } = advertisementApi;
