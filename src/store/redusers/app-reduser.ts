import { ActionTypes, AppAction, AppState } from '../actions/types/types';

const initialState: AppState = {
    userId: null,
};

const appReducer = (state = initialState, action: AppAction): AppState => {
    switch (action.type) {
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
