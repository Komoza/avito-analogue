import { useEffect, useState } from 'react';
import './auth.scss';
import { BackgorundDark } from '../background-dark/background-dark';
import { Login } from './login/login';
import { Signup } from './signup/signup';

interface AuthProps {
    setIsAuthModal: (value: boolean) => void;
    modalModeName: string;
}

export const Auth: React.FC<AuthProps> = ({
    setIsAuthModal,
    modalModeName,
}) => {
    const [modalMode, setModalMode] = useState<string>(modalModeName);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="auth">
            <BackgorundDark closeModal={setIsAuthModal} />
            {modalMode === 'login' && (
                <Login
                    setModalMode={setModalMode}
                    setIsAuthModal={setIsAuthModal}
                />
            )}
            {modalMode === 'signup' && (
                <Signup
                    setModalMode={setModalMode}
                    setIsAuthModal={setIsAuthModal}
                />
            )}
        </div>
    );
};
