export interface AppState {
    guestMode: boolean;
}

export interface SetGuestMode {
    type: ActionTypes.SET_GUEST_MODE;
    payload: boolean;
}

export enum ActionTypes {
    SET_GUEST_MODE = 'SET_GUEST_MODE',
}
export type AppAction = SetGuestMode;
