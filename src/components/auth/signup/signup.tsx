import './signup.scss';

interface SignupProps {
    setModalMode: (value: string) => void;
}
export const Signup: React.FC<SignupProps> = ({ setModalMode }) => {
    const handleClickSignup = () => {
        setModalMode('login');
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
                    type="email"
                    className="signup__email signup__input"
                    placeholder="email"
                />
                <input
                    type="pass"
                    className="signup__password signup__input"
                    placeholder="Пароль"
                />
                <input
                    type="pass"
                    className="signup__confirm-password signup__input"
                    placeholder="Повторите пароль"
                />
                <input
                    type="text"
                    className="signup__name signup__input"
                    placeholder="Имя (необязательно)"
                />
                <input
                    type="text"
                    className="signup__lastname signup__input"
                    placeholder="Фамилия (необязательно)"
                />
                <input
                    type="text"
                    className="signup__city signup__input"
                    placeholder="Город (необязательно)"
                />
            </div>

            <div className="signup__buttons">
                <button className="signup__signup blue-button">
                    Зарегистрироваться
                </button>
                <div className='signup__login-wrap'>
                    <p className='signup__login-text'>Уже есть аккаунт?</p>
                    <button
                        className="signup__login"
                        onClick={handleClickSignup}
                    >
                        Войти
                    </button>
                </div>
            </div>
        </div>
    );
};
