import { advertisementApi } from '../../../services/advertisment';

export interface AppState {
    userId: number | null;
    isMobile: boolean;
}

export interface RootState {
    otherState: AppState;
    [advertisementApi.reducerPath]: ReturnType<typeof advertisementApi.reducer>;
}

export interface SetUserId {
    type: ActionTypes.SET_USER_ID;
    payload: number | null;
}

export interface SetIsMobile {
    type: ActionTypes.SET_IS_MOBILE;
    payload: boolean;
}

export enum ActionTypes {
    SET_USER_ID = 'SET_USER_ID',
    SET_IS_MOBILE = 'SET_IS_MOBILE',
}
export type AppAction = SetUserId | SetIsMobile;
