import { Link } from 'react-router-dom';
import './back-to-main.scss';

export const BackToMain = () => {
    return (
        <div className="back-to-main">
            <img
                src="./public/image/logo.svg"
                alt="logo"
                className="back-to-main__logo"
            />
            <Link to={'/'}>
                <button className="back-to-main__button blue-button">
                    Вернуться на главную
                </button>
            </Link>
        </div>
    );
};
