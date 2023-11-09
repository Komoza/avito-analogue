import { Link } from 'react-router-dom';
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
                    <Link to={'/profile'}>
                        <button className="user-actions__profile header__button">
                            Личный кабинет
                        </button>
                    </Link>
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
