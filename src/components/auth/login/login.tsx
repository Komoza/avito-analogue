import { useRef } from 'react';
import { loginUser } from '../../../api/user';
import './login.scss';
import { saveTokenToLocalStorage } from '../../../utils/token';
import { saveUserIdToState } from '../../../utils/users';
import { CloseModal } from '../../close-modal/close-modal';

interface LoginProps {
    setModalMode: (value: string) => void;
    setIsAuthModal: (value: boolean) => void;
}
export const Login: React.FC<LoginProps> = ({
    setModalMode,
    setIsAuthModal,
}) => {
    const errorMessage = useRef<HTMLParagraphElement | null>(null);
    const inputEmail = useRef<HTMLInputElement | null>(null);
    const inputPassword = useRef<HTMLInputElement | null>(null);

    const handleClickSignup = () => {
        setModalMode('signup');
    };

    const handleClickLogin = () => {
        if (inputEmail.current && inputPassword.current) {
            loginUser(inputEmail.current.value, inputPassword.current.value)
                .then((data) => {
                    showError('');
                    saveTokenToLocalStorage(data);
                    saveUserIdToState(data);
                    setIsAuthModal(false);
                })
                .catch((error) => {
                    showError(error.message);
                });
        }
    };

    const showError = (textError: string) => {
        if (errorMessage.current) {
            errorMessage.current.innerText = textError;
        }
    };

    return (
        <div className="login">
            <CloseModal setIsModalWindow={setIsAuthModal} />

            <img
                src="/image/logo-text.svg"
                alt="logo"
                className="login__logo"
            />
            <div className="login__inputs">
                <input
                    ref={inputEmail}
                    name="mail"
                    type="email"
                    className="login__email login__input"
                    placeholder="email"
                />
                <input
                    ref={inputPassword}
                    name="password"
                    type="password"
                    className="login__password login__input"
                    placeholder="Пароль"
                />
            </div>
            <p
                ref={errorMessage}
                className="error-message error-message--login"
            ></p>

            <div className="login__buttons">
                <button
                    onClick={handleClickLogin}
                    className="login__login blue-button"
                >
                    Войти
                </button>
                <button className="login__signup" onClick={handleClickSignup}>
                    Зарегистрироваться
                </button>
            </div>
        </div>
    );
};
