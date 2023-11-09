import './login.scss';

interface LoginProps {
    setModalMode: (value: string) => void;
}
export const Login: React.FC<LoginProps> = ({ setModalMode }) => {
    const handleClickSignup = () => {
        setModalMode('signup');
    };

    return (
        <div className="login">
            <img
                src="/image/logo-text.svg"
                alt="logo"
                className="login__logo"
            />
            <div className="login__inputs">
                <input
                    type="email"
                    className="login__email login__input"
                    placeholder="email"
                />
                <input
                    type="pass"
                    className="login__password login__input"
                    placeholder="Пароль"
                />
            </div>

            <div className="login__buttons">
                <button className="login__login blue-button">Войти</button>
                <button className="login__signup" onClick={handleClickSignup}>
                    Зарегистрироваться
                </button>
            </div>
        </div>
    );
};
