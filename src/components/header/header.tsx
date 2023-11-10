import { Link } from 'react-router-dom';
import './header.scss';
import { useState } from 'react';
import { Auth } from '../auth/auth';
import {
    getUserFromLocalStorage,
    removeUserFromLocalStorage,
} from '../../utils/user';

export const Header = () => {
    const [isAuthModal, setIsAuthModal] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(
        getUserFromLocalStorage() ? true : false
    );

    const handleClickLogin = () => {
        setIsAuthModal(true);
    };

    const handleClickLogout = () => {
        setIsLogin(false);
        removeUserFromLocalStorage();
    };

    return (
        <div className="header">
            {isAuthModal && (
                <Auth setIsAuthModal={setIsAuthModal} modalModeName={'login'} />
            )}
            {isLogin ? (
                <div className="header__user-actions user-actions">
                    <button className="user-actions__place-an-ad header__button">
                        Разместить объявление
                    </button>
                    <Link to={'/profile'}>
                        <button className="user-actions__profile header__button">
                            Личный кабинет
                        </button>
                    </Link>
                    <button
                        onClick={handleClickLogout}
                        className="header__button"
                    >
                        Выйти
                    </button>
                </div>
            ) : (
                <div className="header__login">
                    <button
                        onClick={handleClickLogin}
                        className="header__button"
                    >
                        Вход в личный кабинет
                    </button>
                </div>
            )}
        </div>
    );
};
