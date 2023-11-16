import { getTokenFromLocalStorage } from '../../utils/token';
import { ActionTypes, AppAction, AppState } from '../actions/types/types';

const initialState: AppState = {
    guestMode: !getTokenFromLocalStorage(),
    userId: null,
};

const appReducer = (state = initialState, action: AppAction): AppState => {
    switch (action.type) {
        case ActionTypes.SET_GUEST_MODE:
            return {
                ...state,
                guestMode: action.payload,
            };

        case ActionTypes.SET_USER_ID:
            return {
                ...state,
                userId: action.payload,
            };
        default:
            return state;
    }
};

export default appReducer;
