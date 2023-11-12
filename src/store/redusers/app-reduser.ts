import { getTokenFromLocalStorage } from '../../utils/token';
import { ActionTypes, AppAction, AppState } from '../actions/types/types';

const initialState: AppState = {
    guestMode: !getTokenFromLocalStorage(),
};

const appReducer = (state = initialState, action: AppAction): AppState => {
    switch (action.type) {
        case ActionTypes.SET_GUEST_MODE:
            return {
                ...state,
                guestMode: action.payload,
            };

        default:
            return state;
    }
};

export default appReducer;
