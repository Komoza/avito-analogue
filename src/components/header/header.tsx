import { Link } from 'react-router-dom';
import './header.scss';
import { useState } from 'react';
import { Auth } from '../auth/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from '../../store/actions/creators/creators';
import { removeTokenFromLocalStorage } from '../../utils/token';
import { AdsSettingTextOnly } from '../ads-setting/ads-setting-text-only';
import { RootState } from '../../store/actions/types/types';
import { SearchBar } from '../../pages/main/components/search-bar/search-bar';
import { Ads } from '../../interface/global';

const emptyAds = {
    id: 0,
    title: '',
    description: '',
    price: null,
    images: [],
};

interface HeaderProps {
    setArrAds?: (value: Ads[]) => void;
    dataAds?: Ads[];
    isMobile?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
    setArrAds,
    dataAds,
    isMobile,
}) => {
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
            <img
                src="/image/mini-logo.png"
                alt="лого"
                className="header__mini-logo"
            />
            {isMobile && setArrAds && dataAds && (
                <SearchBar
                    setArrAds={setArrAds}
                    dataAds={dataAds}
                    isMobile={isMobile}
                />
            )}
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
