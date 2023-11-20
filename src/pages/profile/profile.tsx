import { BackToMain } from '../../components/back-to-main/back-to-main';
import { UserInfo } from './components/user-info/user-info';
import { Title } from './components/title/title';
import './profile.scss';
import { SellerInfo } from './components/seller-info/seller-info';
import { Products } from './components/products/products';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User } from '../../interface/global';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/actions/types/types';
import { getAllUsers, getUser } from '../../api/user';
import { getTokenFromLocalStorage } from '../../utils/token';
import { Header } from '../../components/header/header';

export const Profile = () => {
    const [userProfile, setUserProfile] = useState<User | null>(null);
    const [pageMode, setPageMode] = useState<string>('guest'); // guest, not-logged, my-profile, error, not-found-user
    const userIdState = useSelector(
        (state: RootState) => state.otherState.userId
    );

    const userID = useParams().id;

    useEffect(() => {
        const fetchData = () => {
            if (userID) {
                if (userID === 'me' || parseInt(userID) === userIdState) {
                    if (userIdState) {
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
                    getAllUsers()
                        .then((data) => {
                            if (data) {
                                const findUser = (arrUsers: User[]) => {
                                    for (let i = 0; i < arrUsers?.length; i++) {
                                        if (
                                            arrUsers[i].id === parseInt(userID)
                                        ) {
                                            setPageMode('guest');
                                            return arrUsers[i];
                                        }
                                    }
                                    setPageMode('not-found-user');
                                    return null;
                                };

                                setUserProfile(findUser(data));
                            }
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
    }, [userID, userIdState]);

    return (
        <div className="profile__wrapper">
            <Header />
            <BackToMain />

            {pageMode === 'not-logged' && (
                <div className="message-page">
                    <p className="message-page__text">
                        Сначала войдите в аккаунт
                    </p>
                </div>
            )}

            {pageMode === 'not-found-user' && (
                <div className="message-page">
                    <p className="message-page__text">Пользовател не найден</p>
                </div>
            )}

            {pageMode === 'my-profile' && userProfile && (
                <>
                    <Title titleText={`Здравствуйте, ${userProfile?.name}!`} />
                    <UserInfo
                        userProfile={userProfile}
                        setUserProfile={setUserProfile}
                    />
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
