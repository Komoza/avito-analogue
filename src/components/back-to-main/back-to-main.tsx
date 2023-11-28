import { Link } from 'react-router-dom';
import './back-to-main.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/actions/types/types';

export const BackToMain = () => {
    const isMobile = useSelector(
        (state: RootState) => state.otherState.isMobile
    );

    return (
        <div className="back-to-main">
            {!isMobile ? (
                <>
                    <img
                        src="/image/logo.svg"
                        alt="logo"
                        className="back-to-main__logo"
                    />
                    <Link to={'/'}>
                        <button className="back-to-main__button blue-button">
                            Вернуться на главную
                        </button>
                    </Link>
                </>
            ) : (
                <Link to={'/'}>
                    <svg
                        className="back-to-main__svg"
                        width="12"
                        height="21"
                        viewBox="0 0 12 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11 1.5L2 10.5L11 19.5"
                            stroke="black"
                            stroke-width="2"
                        />
                    </svg>
                </Link>
            )}
        </div>
    );
};
