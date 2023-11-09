import './info.scss';

export const Info = () => {
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

    return (
        <div className="profile-info">
            <h2 className="profile-info__title">Настройка профиля</h2>

            <div className="profile-info__user user">
                <div className="user__image-wrapper">
                    <img
                        src="/image/avatar-test.png"
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
