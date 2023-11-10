import { BackToMain } from '../../components/back-to-main/back-to-main';
import { UserInfo } from './components/user-info/user-info';
import { Title } from './components/title/title';
import './profile.scss';
import { SellerInfo } from './components/seller-info/seller-info';
import { Products } from './components/products/products';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAdsById } from '../../api/ads';
import { User, userBack } from '../../interface/global';
import { getUserFromLocalStorage } from '../../utils/user';

export const Profile = () => {
    const [userProfile, setUserProfile] = useState<User | null>(null);
    const [guestMode, setGuestMode] = useState<boolean>(true);
    const adsId = useParams().id;

    const checkGuestMode = (user: userBack | null) => {
        if (user && user.id === userProfile?.id) {
            return false;
        }

        return true;
    };

    useEffect(() => {
        const fetchData = () => {
            if (adsId) {
                getAdsById(adsId)
                    .then((data) => {
                        setUserProfile(data.user);
                    })
                    .catch((error) => {
                        console.error('Error fetching workout data:', error);
                    });
            }
        };

        fetchData();
    }, [adsId]);

    useEffect(() => {
        const newGuestMode = checkGuestMode(getUserFromLocalStorage());
        setGuestMode(newGuestMode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userProfile]);

    return (
        <div className="profile__wrapper">
            <BackToMain />
            <Title
                titleText={
                    guestMode ? 'Профиль продавца' : 'Здравствуйте, Антон!'
                }
            />

            {guestMode && userProfile ? (
                <SellerInfo userProfile={userProfile} />
            ) : (
                <UserInfo />
            )}
            {userProfile?.id && (
                <Products
                    userId={userProfile.id}
                    titleText={guestMode ? 'Товары продавца' : 'Мои товары'}
                />
            )}
        </div>
    );
};
