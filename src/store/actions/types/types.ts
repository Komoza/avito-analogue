export interface AppState {
    guestMode: boolean;
    userId: number | null;
}

export interface SetGuestMode {
    type: ActionTypes.SET_GUEST_MODE;
    payload: boolean;
}

export interface SetUserId {
    type: ActionTypes.SET_USER_ID;
    payload: number | null;
}

export enum ActionTypes {
    SET_GUEST_MODE = 'SET_GUEST_MODE',
    SET_USER_ID = 'SET_USER_ID',
}
export type AppAction = SetGuestMode | SetUserId;
