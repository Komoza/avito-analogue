import { useState } from 'react';
import './bottom-navigation.scss';
import { AdsSettingTextOnly } from '../ads-setting/ads-setting-text-only';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/actions/types/types';
import { Auth } from '../auth/auth';

const emptyAds = {
    id: 0,
    title: '',
    description: '',
    price: null,
    images: [],
};

export const BottomNavigation = () => {
    const [isModalAddPost, setIsModalAddPost] = useState<boolean>(false);
    const [isModalAuth, setIsModalAuth] = useState<boolean>(false);

    const navigate = useNavigate();
    const userId = useSelector((state: RootState) => state.otherState.userId);

    const handleClickGoToMain = () => {
        navigate('/');
    };

    const handleClickAddPost = () => {
        if (userId) {
            setIsModalAddPost(true);
        } else {
            setIsModalAuth(true);
        }
    };

    const handleClickGoToProfile = () => {
        if (userId) {
            navigate('/profile/me');
        } else {
            setIsModalAuth(true);
        }
    };

    return (
        <div className="bottom-navigation">
            {isModalAddPost && (
                <AdsSettingTextOnly
                    setIsAdsModal={setIsModalAddPost}
                    viewMode="new"
                    ads={emptyAds}
                />
            )}
            {isModalAuth && (
                <Auth setIsAuthModal={setIsModalAuth} modalModeName={'login'} />
            )}
            <img
                className="bottom-navigation__image-home"
                onClick={handleClickGoToMain}
                src="/image/home.svg"
                alt="на главную"
            />
            <img
                className="bottom-navigation__image-add-post"
                onClick={handleClickAddPost}
                src="/image/add-post.svg"
                alt="разместить объявление"
            />
            <img
                className="bottom-navigation__image-profile"
                onClick={handleClickGoToProfile}
                src="/image/profile.svg"
                alt="перейти в профиль"
            />
        </div>
    );
};
