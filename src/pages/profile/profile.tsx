import { BackToMain } from '../../components/back-to-main/back-to-main';
import { UserInfo } from './components/user-info/user-info';
import { Title } from './components/title/title';
import './profile.scss';
import { SellerInfo } from './components/seller-info/seller-info';
import { Products } from './components/products/products';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAdsById } from '../../api/ads';
import { User } from '../../interface/global';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/actions/types/types';
import { getUser } from '../../api/user';
import { getTokenFromLocalStorage } from '../../utils/token';

export const Profile = () => {
    const [userProfile, setUserProfile] = useState<User | null>(null);
    const [pageMode, setPageMode] = useState<string>('guest'); // guest, not-logged, my-profile, error
    const guestModeState = useSelector((state: AppState) => state.guestMode);

    const adsId = useParams().id;

    useEffect(() => {
        const fetchData = () => {
            if (adsId) {
                if (adsId === 'me') {
                    if (!guestModeState) {
                        getUser(getTokenFromLocalStorage())
                            .then((data) => {
                                setUserProfile(data);
                                setPageMode('my-profile');
                            })
                            .catch((error) => {
                                console.error(
                                    'Error fetching workout data:',
                                    error
                                );
                                setPageMode('error');
                            });
                    } else {
                        setPageMode('not-logged');
                    }
                } else {
                    getAdsById(adsId)
                        .then((data) => {
                            setUserProfile(data.user);
                            setPageMode('guest');
                        })
                        .catch((error) => {
                            console.error(
                                'Error fetching workout data:',
                                error
                            );
                            setPageMode('error');
                        });
                }
            }
        };

        fetchData();
    }, [adsId, guestModeState]);

    return (
        <div className="profile__wrapper">
            <BackToMain />

            {pageMode === 'not-logged' && (
                <div className="before-login">
                    <p className="before-login__text">
                        Сначала войдите в аккаунт
                    </p>
                </div>
            )}

            {pageMode === 'my-profile' && userProfile && (
                <>
                    <Title titleText={`Здравствуйте, ${userProfile?.name}!`} />
                    <UserInfo userProfile={userProfile} />
                    <Products
                        userId={userProfile.id}
                        titleText={'Мои товары'}
                    />
                </>
            )}

            {pageMode === 'guest' && userProfile && (
                <>
                    <Title titleText={'Профиль продавца'} />
                    <SellerInfo userProfile={userProfile} />
                    <Products
                        userId={userProfile.id}
                        titleText={'Товары продавца'}
                    />
                </>
            )}
        </div>
    );
};
