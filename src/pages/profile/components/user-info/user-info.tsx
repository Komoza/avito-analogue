import { useState } from 'react';
import { User } from '../../../../interface/global';
import './user-info.scss';

interface UserInfoProps {
    userProfile: User;
}

export const UserInfo: React.FC<UserInfoProps> = ({ userProfile }) => {
    const [userProfileState, setUserProfileState] = useState<User>(userProfile);

    const handleFocusInput = (event: React.FocusEvent) => {
        event.target.previousElementSibling?.classList.add(
            'user__input-text--active'
        );
    };

    const handleBlurInput = (event: React.FocusEvent) => {
        event.target.previousElementSibling?.classList.remove(
            'user__input-text--active'
        );
    };

    const updateUserState = (value: string, field: string) => {
        setUserProfileState({ ...userProfileState, [field]: value });
    };
    return (
        <div className="profile-info">
            <h2 className="profile-info__title">Настройка профиля</h2>

            <div className="profile-info__user user">
                <div className="user__image-wrapper">
                    <img
                        src="/image/no-avatar.png"
                        alt="avatar"
                        className="user__image"
                    />
                    <button className="user__change-avatar">Заменить</button>
                </div>

                <form className="user__data">
                    <div className="user__fullname">
                        <div className="user__input-box">
                            <p className="user__input-text">Имя</p>
                            <input
                                onFocus={(event) => handleFocusInput(event)}
                                onBlur={(event) => handleBlurInput(event)}
                                type="text"
                                className="user__name user__input"
                                placeholder="Введите имя"
                                value={userProfileState.name}
                                onChange={(event) =>
                                    updateUserState(event.target.value, 'name')
                                }
                            />
                        </div>

                        <div className="user__input-box">
                            <p className="user__input-text">Фамилия</p>
                            <input
                                onFocus={(event) => handleFocusInput(event)}
                                onBlur={(event) => handleBlurInput(event)}
                                type="text"
                                className="user__lastname user__input"
                                placeholder="Введите фамилию"
                                value={userProfileState.surname}
                                onChange={(event) =>
                                    updateUserState(
                                        event.target.value,
                                        'surname'
                                    )
                                }
                            />
                        </div>
                    </div>

                    <div className="user__input-box">
                        <p className="user__input-text">Город</p>
                        <input
                            onFocus={(event) => handleFocusInput(event)}
                            onBlur={(event) => handleBlurInput(event)}
                            type="text"
                            className="user__city user__input"
                            placeholder="Введите город"
                            value={userProfileState.city}
                            onChange={(event) =>
                                updateUserState(event.target.value, 'city')
                            }
                        />
                    </div>

                    <div className="user__input-box">
                        <p className="user__input-text">Телефон</p>
                        <input
                            onFocus={(event) => handleFocusInput(event)}
                            onBlur={(event) => handleBlurInput(event)}
                            type="tel"
                            className="user__phone user__input"
                            placeholder="Введите номер телефона"
                            value={userProfileState.phone}
                            onChange={(event) =>
                                updateUserState(event.target.value, 'phone')
                            }
                        />
                    </div>

                    <button className="user__save blue-button">
                        Сохранить
                    </button>
                </form>
            </div>
        </div>
    );
};
