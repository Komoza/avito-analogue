import { ActionTypes } from '../types/types';

export const setUserId = (userId: number | null) => {
    return {
        type: ActionTypes.SET_USER_ID,
        payload: userId,
    };
};
