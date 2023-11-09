import { useState } from 'react';
import './calling-button.scss';
import { formateNumber } from '../../utils/advertisement';

interface CallingButton {
    phoneNumber: string;
}

export const CallingButton: React.FC<CallingButton> = ({ phoneNumber }) => {
    const [isHiddenPhone, setIsHiddenPhone] = useState<boolean>(true);

    const handleClickShowPhone = () => {
        setIsHiddenPhone(!isHiddenPhone);
    };

    const handleClickCallPhone = (phone: string) => {
        const phoneNumber = phone.replace(/\D/g, '');
        const telLink = `tel:+${phoneNumber}`;
        window.location.href = telLink;
    };

    return (
        <>
            {isHiddenPhone ? (
                <button
                    className="calling-button__show-phone blue-button"
                    onClick={handleClickShowPhone}
                >
                    Показать телефон <br />
                    {formateNumber(phoneNumber)}
                </button>
            ) : (
                <button
                    className="calling-button__call blue-button"
                    onClick={() => {
                        handleClickCallPhone(phoneNumber);
                    }}
                >
                    Позвонить <br />
                    {phoneNumber}
                </button>
            )}
        </>
    );
};
