import { useEffect, useRef, useState } from 'react';
import { BackgorundDark } from '../background-dark/background-dark';
import './ads-setting.scss';
import { getTokenFromLocalStorage } from '../../utils/token';
import { postAdsText } from '../../api/ads';
import { useNavigate } from 'react-router-dom';

interface AdsSettingProps {
    setIsAdsModal: (value: boolean) => void;
}

export const AdsSettingTextOnly: React.FC<AdsSettingProps> = ({
    setIsAdsModal,
}) => {
    const [isNotActiveButton, setIsNotActiveButton] = useState<boolean>(true);

    const refName = useRef<HTMLInputElement | null>(null);
    const refDescription = useRef<HTMLTextAreaElement | null>(null);
    const refPrice = useRef<HTMLInputElement | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleClickPublic = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();

        if (refName.current && refDescription.current && refPrice.current) {
            if (refName.current.value) {
                postAdsText(
                    {
                        title: refName.current.value,
                        description: refDescription.current.value,
                        price: refPrice.current.value
                            ? parseInt(refPrice.current.value)
                            : 0,
                    },
                    getTokenFromLocalStorage()
                )
                    .then((data) => {
                        navigate(`/ads/${data.id}`);
                        setIsAdsModal(false);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                refName.current.classList.add('--error-input');
            }
        }
    };

    const handleChangeName = () => {
        if (refName.current) {
            if (refName.current.value !== '') {
                refName.current.classList.remove('--error-input');
                setIsNotActiveButton(false);
            } else {
                setIsNotActiveButton(true);
            }
        }
    };

    return (
        <div className="ads-setting">
            <BackgorundDark closeModal={setIsAdsModal} />
            <form className="ads-set">
                <p className="ads-set__title">Новое объявление</p>

                <div className="ads-set__name-wrap">
                    <p className="ads-set__name-text">Название</p>
                    <input
                        onChange={handleChangeName}
                        ref={refName}
                        name="name-ads"
                        type="text"
                        className="ads-set__name"
                        placeholder="Введите название (обязательное поле)"
                    />
                </div>

                <div className="ads-set__description-wrap">
                    <p className="ads-set__description-text">Описание</p>
                    <textarea
                        ref={refDescription}
                        name="description-ads"
                        className="ads-set__description"
                        placeholder="Введите описание"
                    />
                </div>

                <div className="ads-set__price-wrap">
                    <div className="ads-set__price-text">Цена</div>
                    <div className="ads-set__price-box">
                        <input
                            ref={refPrice}
                            type="number"
                            className="ads-set__price"
                            placeholder="0"
                        />
                        <p className="ads-set__price-valute">₽</p>
                    </div>
                </div>

                <button
                    onClick={(e) => handleClickPublic(e)}
                    className={`ads-set__public blue-button${
                        isNotActiveButton ? '--not-active' : ''
                    }`}
                >
                    Опубликовать
                </button>
            </form>
        </div>
    );
};
