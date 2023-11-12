import { useRef } from 'react';
import './signup.scss';
import { loginUser, registerUser } from '../../../api/user';
import { useDispatch } from 'react-redux';
import { setGuestMode } from '../../../store/actions/creators/creators';
import { useNavigate } from 'react-router-dom';
import { saveTokenToLocalStorage } from '../../../utils/token';

interface SignupProps {
    setModalMode: (value: string) => void;
    setIsAuthModal: (value: boolean) => void;
}
export const Signup: React.FC<SignupProps> = ({
    setModalMode,
    setIsAuthModal,
}) => {
    const inputEmail = useRef<HTMLInputElement | null>(null);
    const inputPassword = useRef<HTMLInputElement | null>(null);
    const inputConfirmPassword = useRef<HTMLInputElement | null>(null);
    const inputFirstname = useRef<HTMLInputElement | null>(null);
    const inputLastname = useRef<HTMLInputElement | null>(null);
    const inputCity = useRef<HTMLInputElement | null>(null);
    const errorMessage = useRef<HTMLParagraphElement | null>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickLogin = () => {
        setModalMode('login');
    };

    const handleClickSignup = () => {
        if (validation()) {
            showError('');
            if (
                inputPassword.current &&
                inputEmail.current &&
                inputFirstname.current &&
                inputLastname.current &&
                inputCity.current
            ) {
                registerUser({
                    id: 0,
                    password: inputPassword.current.value,
                    role: 'user',
                    email: inputEmail.current.value,
                    name: inputFirstname.current.value,
                    surname: inputLastname.current.value,
                    phone: '',
                    city: inputCity.current.value,
                })
                    .then(() => {
                        dispatch(setGuestMode(false));
                        setIsAuthModal(false);
                        if (inputPassword.current && inputEmail.current) {
                            loginUser(
                                inputEmail.current.value,
                                inputPassword.current.value
                            )
                                .then((data) => {
                                    saveTokenToLocalStorage(data);
                                    navigate('/profile/12');
                                })
                                .catch(() => {
                                    setModalMode('login');
                                });
                        }
                    })
                    .catch((error) => {
                        showError(error.message);
                    });
            }
        }
    };

    const showError = (textError: string) => {
        if (errorMessage.current) {
            errorMessage.current.innerText = textError;
        }
    };

    const validation = () => {
        if (inputEmail.current && inputEmail.current.value.length < 2) {
            showError('Имя должно состоять не менее чем из 2 символов');
            return false;
        }

        if (inputPassword.current && inputPassword.current.value.length < 8) {
            showError('Пароль должен быть не менее чем из 8 символов');
            return false;
        }

        if (
            inputConfirmPassword.current &&
            inputPassword.current &&
            inputConfirmPassword.current.value !== inputPassword.current.value
        ) {
            showError('Пароли должны совпадать');
            return false;
        }
        return true;
    };

    return (
        <div className="signup">
            <img
                src="/image/logo-text.svg"
                alt="logo"
                className="signup__logo"
            />

            <div className="signup__inputs">
                <input
                    ref={inputEmail}
                    name="mail"
                    type="email"
                    className="signup__email signup__input"
                    placeholder="email"
                />
                <input
                    ref={inputPassword}
                    name="password"
                    type="password"
                    className="signup__password signup__input"
                    placeholder="Пароль"
                />
                <input
                    ref={inputConfirmPassword}
                    name="confirm-password"
                    type="password"
                    className="signup__confirm-password signup__input"
                    placeholder="Повторите пароль"
                />
                <input
                    ref={inputFirstname}
                    name="firstname"
                    type="text"
                    className="signup__name signup__input"
                    placeholder="Имя (необязательно)"
                />
                <input
                    ref={inputLastname}
                    name="lastname"
                    type="text"
                    className="signup__lastname signup__input"
                    placeholder="Фамилия (необязательно)"
                />
                <input
                    ref={inputCity}
                    name="city"
                    type="text"
                    className="signup__city signup__input"
                    placeholder="Город (необязательно)"
                />
            </div>

            <p
                ref={errorMessage}
                className="error-message error-message--register"
            ></p>

            <div className="signup__buttons">
                <button
                    className="signup__signup blue-button"
                    onClick={handleClickSignup}
                >
                    Зарегистрироваться
                </button>
                <div className="signup__login-wrap">
                    <p className="signup__login-text">Уже есть аккаунт?</p>
                    <button
                        className="signup__login"
                        onClick={handleClickLogin}
                    >
                        Войти
                    </button>
                </div>
            </div>
        </div>
    );
};
