import { ActionTypes } from '../types/types';

export const setGuestMode = (guestMode: boolean) => {
    return {
        type: ActionTypes.SET_GUEST_MODE,
        payload: guestMode,
    };
};
