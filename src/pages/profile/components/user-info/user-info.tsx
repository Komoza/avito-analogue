import { useEffect, useRef, useState } from 'react';
import { User } from '../../../../interface/global';
import './user-info.scss';
import { postUserAvatar, updateUser } from '../../../../api/user';
import { getTokenFromLocalStorage } from '../../../../utils/token';
import { host } from '../../../../constant';

interface UserInfoProps {
    userProfile: User;
    setUserProfile: (value: User) => void;
    setIsChangePassWindow: (value: boolean) => void;
}

export const UserInfo: React.FC<UserInfoProps> = ({
    userProfile,
    setUserProfile,
    setIsChangePassWindow,
}) => {
    const [userProfileState, setUserProfileState] = useState<User>(userProfile);
    const [isSuccessMessage, setIsSuccessMessage] = useState<boolean>(false);
    const [notActiveSaveButton, setNotActiveSaveButton] =
        useState<boolean>(true);

    const refFile = useRef<HTMLInputElement | null>(null);

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

    const handleClickSaveUser = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();

        if (notActiveSaveButton) {
            return;
        }

        const fetchData = () => {
            updateUser(userProfileState, getTokenFromLocalStorage())
                .then((data) => {
                    setUserProfile(data);
                    setIsSuccessMessage(true);

                    setTimeout(() => {
                        setIsSuccessMessage(false);
                    }, 3000);
                })
                .catch((error) => {
                    console.error('Error fetching workout data:', error);
                });
        };

        fetchData();
    };

    const handleClickChangeAvatar = () => {
        refFile.current?.click();
    };

    const handleChangeAvatar = () => {
        if (refFile.current?.files) {
            const file = refFile.current.files[0];
            const formData = new FormData();
            formData.append('file', file);

            postUserAvatar(getTokenFromLocalStorage(), formData)
                .then((data) => {
                    setUserProfile(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const changeButton = () => {
        for (const key in userProfileState) {
            if (
                userProfileState[key as keyof User] !==
                userProfile[key as keyof User]
            ) {
                setNotActiveSaveButton(false);
                return;
            }
        }
        setNotActiveSaveButton(true);
        return;
    };

    const handleClickChangePassword = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        setIsChangePassWindow(true);
    };

    useEffect(() => {
        changeButton();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userProfileState]);

    useEffect(() => {
        setUserProfileState({ ...userProfile });
    }, [userProfile]);

    return (
        <div className="profile-info">
            <h2 className="profile-info__title">Настройка профиля</h2>

            <div className="profile-info__user user">
                <div className="user__image-wrapper">
                    <img
                        src={
                            userProfileState.avatar
                                ? `${host}/${userProfileState.avatar}`
                                : '/image/no-avatar.png'
                        }
                        alt="avatar"
                        className="user__image"
                    />
                    <button
                        onClick={handleClickChangeAvatar}
                        className="user__change-avatar"
                    >
                        Изменить
                    </button>
                    <input
                        ref={refFile}
                        onChange={handleChangeAvatar}
                        className="user__change-avatar--input"
                        type="file"
                        accept="image/png, image/jpeg"
                    />
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

                    <div className="user-save__wrap">
                        <button
                            onClick={(e) => handleClickChangePassword(e)}
                            className="user__change-password blue-button"
                        >
                            Сменить пароль
                        </button>
                        <button
                            onClick={(event) => handleClickSaveUser(event)}
                            className={`user__save blue-button${
                                notActiveSaveButton ? '--not-active' : ''
                            }`}
                        >
                            Сохранить
                        </button>
                        {isSuccessMessage && (
                            <p className="success-update">
                                Данные успешно изменены
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};
