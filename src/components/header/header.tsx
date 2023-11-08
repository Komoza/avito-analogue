import './header.scss';

const isLogin: boolean = true;

export const Header = () => {
    return (
        <div className="header">
            {isLogin ? (
                <div className="header__user-actions user-actions">
                    <button className="user-actions__place-an-ad header__button">
                        Разместить объявление
                    </button>
                    <button className="user-actions__profile header__button">
                        Личный кабинет
                    </button>
                </div>
            ) : (
                <div className="header__login login">
                    <button className="login__button header__button">
                        Вход в личный кабинет
                    </button>
                </div>
            )}
        </div>
    );
};
