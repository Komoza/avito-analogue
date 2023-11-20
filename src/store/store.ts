import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { advertisementApi } from '../services/advertisment';
import appReducer from './redusers/app-reduser';

const rootReducer = combineReducers({
    otherState: appReducer,
    [advertisementApi.reducerPath]: advertisementApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(advertisementApi.middleware),
});
