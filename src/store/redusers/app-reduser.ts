import { ActionTypes, AppAction, AppState } from '../actions/types/types';

const initialState: AppState = {
    userId: null,
    isMobile: innerWidth > 630 ? false : true,
};

const appReducer = (state = initialState, action: AppAction): AppState => {
    switch (action.type) {
        case ActionTypes.SET_USER_ID:
            return {
                ...state,
                userId: action.payload,
            };
        case ActionTypes.SET_IS_MOBILE:
            return {
                ...state,
                isMobile: action.payload,
            };
        default:
            return state;
    }
};

export default appReducer;
