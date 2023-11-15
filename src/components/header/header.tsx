import { Link } from 'react-router-dom';
import './header.scss';
import { useState } from 'react';
import { Auth } from '../auth/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setGuestMode } from '../../store/actions/creators/creators';
import { AppState } from '../../store/actions/types/types';
import { removeTokenFromLocalStorage } from '../../utils/token';
import { AdsSettingTextOnly } from '../ads-setting/ads-setting-text-only';

export const Header = () => {
    const [isAuthModal, setIsAuthModal] = useState<boolean>(false);
    const [isAdsModal, setIsAdsModal] = useState<boolean>(false);
    const guestModeState = useSelector((state: AppState) => state.guestMode);
    const dispatch = useDispatch();

    const handleClickLogin = () => {
        setIsAuthModal(true);
    };

    const handleClickLogout = () => {
        removeTokenFromLocalStorage();
        dispatch(setGuestMode(true));
    };

    const handleClickPlaceAnAd = () => {
        setIsAdsModal(true);
    };

    return (
        <div className="header">
            {isAdsModal && <AdsSettingTextOnly setIsAdsModal={setIsAdsModal} />}
            {isAuthModal && (
                <Auth setIsAuthModal={setIsAuthModal} modalModeName={'login'} />
            )}
            {!guestModeState ? (
                <div className="header__user-actions user-actions">
                    <button
                        onClick={handleClickPlaceAnAd}
                        className="user-actions__place-an-ad header__button"
                    >
                        Разместить объявление
                    </button>
                    <Link to={'/profile/me'}>
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
