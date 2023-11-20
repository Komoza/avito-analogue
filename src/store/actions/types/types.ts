import { advertisementApi } from '../../../services/advertisment';

export interface AppState {
    userId: number | null;
}

export interface RootState {
    otherState: AppState;
    [advertisementApi.reducerPath]: ReturnType<typeof advertisementApi.reducer>;
}

export interface SetUserId {
    type: ActionTypes.SET_USER_ID;
    payload: number | null;
}

export enum ActionTypes {
    SET_USER_ID = 'SET_USER_ID',
}
export type AppAction = SetUserId;
