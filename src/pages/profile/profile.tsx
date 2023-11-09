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
import { isLogin } from '../../constant';

const guestMode = !isLogin;

export const Profile = () => {
    const [userProfile, setUserProfile] = useState<User | null>(null);
    const adsId = useParams().id;

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
