import { Link } from 'react-router-dom';
import './not-found.scss';

export const NotFoundPage = () => {
    return (
        <div className="not-found">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__text">Страница не найдена</p>
            <Link to={'/'}>
                <button className="not-found__back-to-main blue-button">
                    Вернуться на главную
                </button>
            </Link>
        </div>
    );
};
