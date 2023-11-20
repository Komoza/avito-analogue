import { Link } from 'react-router-dom';
import './header.scss';
import { useState } from 'react';
import { Auth } from '../auth/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from '../../store/actions/creators/creators';
import { removeTokenFromLocalStorage } from '../../utils/token';
import { AdsSettingTextOnly } from '../ads-setting/ads-setting-text-only';
import { RootState } from '../../store/actions/types/types';

const emptyAds = {
    id: 0,
    title: '',
    description: '',
    price: null,
    images: [],
};

export const Header = () => {
    const [isAuthModal, setIsAuthModal] = useState<boolean>(false);
    const [isAdsModal, setIsAdsModal] = useState<boolean>(false);
    const userIdState = useSelector(
        (state: RootState) => state.otherState.userId
    );
    const dispatch = useDispatch();

    const handleClickLogin = () => {
        setIsAuthModal(true);
    };

    const handleClickLogout = () => {
        removeTokenFromLocalStorage();
        dispatch(setUserId(null));
    };

    const handleClickPlaceAnAd = () => {
        setIsAdsModal(true);
    };

    return (
        <div className="header">
            {isAdsModal && (
                <AdsSettingTextOnly
                    setIsAdsModal={setIsAdsModal}
                    viewMode="new"
                    ads={emptyAds}
                />
            )}
            {isAuthModal && (
                <Auth setIsAuthModal={setIsAuthModal} modalModeName={'login'} />
            )}
            {userIdState ? (
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
