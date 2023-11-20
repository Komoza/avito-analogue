import { getUser } from '../api/user';
import { Token } from '../interface/global';
import { setUserId } from '../store/actions/creators/creators';
import { store } from '../store/store';

export const saveUserIdToState = (token: Token) => {
    if (token) {
        getUser(token)
            .then((data) => {
                store.dispatch(setUserId(data.id));
            })
            .catch((error) => console.error(error));
    }
};
