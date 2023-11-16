import { ActionTypes } from '../types/types';

export const setGuestMode = (guestMode: boolean) => {
    return {
        type: ActionTypes.SET_GUEST_MODE,
        payload: guestMode,
    };
};

export const setUserId = (userId: number | null) => {
    return {
        type: ActionTypes.SET_USER_ID,
        payload: userId,
    };
};
