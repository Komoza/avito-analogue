import { ActionTypes } from '../types/types';

export const setUserId = (userId: number | null) => {
    return {
        type: ActionTypes.SET_USER_ID,
        payload: userId,
    };
};

export const setIsMobile = (isMobile: boolean) => {
    return {
        type: ActionTypes.SET_IS_MOBILE,
        payload: isMobile,
    };
};
