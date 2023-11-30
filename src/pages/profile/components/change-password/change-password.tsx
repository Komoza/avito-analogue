import { useEffect, useRef, useState } from 'react';
import { BackgorundDark } from '../../../../components/background-dark/background-dark';
import './change-password.scss';
import { CloseModal } from '../../../../components/close-modal/close-modal';
import { changePassword } from '../../../../api/user';
import { getTokenFromLocalStorage } from '../../../../utils/token';

interface ChangePasswordProps {
    setIsChangePassWindow: (value: boolean) => void;
}
export const ChangePassword: React.FC<ChangePasswordProps> = ({
    setIsChangePassWindow,
}) => {
    const [isNotActiveButton, setIsNotActiveButton] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const refPassword = useRef<HTMLInputElement | null>(null);
    const refNewPassword = useRef<HTMLInputElement | null>(null);
    const refConfirmPassword = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleChangeInput = () => {
        if (refPassword.current?.value === '') {
            setIsNotActiveButton(true);
            return;
        }

        if (refNewPassword.current?.value === '') {
            setIsNotActiveButton(true);
            return;
        }

        if (
            refConfirmPassword.current?.value !== refNewPassword.current?.value
        ) {
            setIsNotActiveButton(true);
            return;
        }

        setIsNotActiveButton(false);
    };

    const handleClickSaveButton = () => {
        if (refPassword.current && refNewPassword.current) {
            changePassword(
                refPassword.current.value,
                refNewPassword.current.value,
                getTokenFromLocalStorage()
            )
                .then(() => {
                    setIsChangePassWindow(false);
                })
                .catch((error) => {
                    setErrorMessage(error.message);
                });
        }
    };

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
                        ref={refPassword}
                        onChange={handleChangeInput}
                        name="password"
                        type="password"
                        className="change-password__input"
                        placeholder="Введите старый пароль"
                    />
                    <input
                        ref={refNewPassword}
                        onChange={handleChangeInput}
                        name="new password"
                        type="password"
                        className="change-password__input"
                        placeholder="Введите новый пароль"
                    />
                    <input
                        ref={refConfirmPassword}
                        onChange={handleChangeInput}
                        name="confirm password"
                        type="password"
                        className="change-password__input"
                        placeholder="Повторите новый пароль"
                    />
                </div>

                {errorMessage && (
                    <p className="error-message change-password__error">
                        {errorMessage}
                    </p>
                )}
                <button
                    onClick={handleClickSaveButton}
                    className={`change-password__button blue-button${
                        isNotActiveButton ? '--not-active' : ''
                    }`}
                >
                    Сохранить
                </button>
            </div>
        </div>
    );
};
