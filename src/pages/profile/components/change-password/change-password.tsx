import { useEffect } from 'react';
import { BackgorundDark } from '../../../../components/background-dark/background-dark';
import './change-password.scss';
import { CloseModal } from '../../../../components/close-modal/close-modal';

interface ChangePasswordProps {
    setIsChangePassWindow: (value: boolean) => void;
}
export const ChangePassword: React.FC<ChangePasswordProps> = ({
    setIsChangePassWindow,
}) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="change-password">
            <BackgorundDark closeModal={setIsChangePassWindow} />
            <div className="change-password__wrap">
                <CloseModal setIsModalWindow={setIsChangePassWindow} />
                <img
                    src="/image/logo-text.svg"
                    alt="logo"
                    className="change-password__logo"
                />
                <div className="change-password__inputs">
                    <input
                        name="password"
                        type="password"
                        className="change-password__input"
                        placeholder="Введите старый пароль"
                    />
                    <input
                        name="new password"
                        type="password"
                        className="change-password__input"
                        placeholder="Введите новый пароль"
                    />
                    <input
                        name="confirm password"
                        type="password"
                        className="change-password__input"
                        placeholder="Повторите новый пароль"
                    />
                </div>

                <button className="change-password__button blue-button">
                    Сохранить
                </button>
            </div>
        </div>
    );
};
