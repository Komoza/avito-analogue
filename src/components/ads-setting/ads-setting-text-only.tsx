import { useEffect, useRef, useState } from 'react';
import { BackgorundDark } from '../background-dark/background-dark';
import './ads-setting.scss';
import { getTokenFromLocalStorage } from '../../utils/token';
import { postAdsText } from '../../api/ads';
import { useNavigate } from 'react-router-dom';
import { Image } from '../../interface/global';

interface AdsSettingProps {
    setIsAdsModal: (value: boolean) => void;
    viewMode: string;
    ads: {
        title: string;
        description: string;
        price: number | null;
        images: Image[];
    };
}

export const AdsSettingTextOnly: React.FC<AdsSettingProps> = ({
    setIsAdsModal,
    viewMode,
    ads,
}) => {
    const [isNotActiveButton, setIsNotActiveButton] = useState<boolean>(true);
    const refName = useRef<HTMLInputElement | null>(null);
    const refDescription = useRef<HTMLTextAreaElement | null>(null);
    const refPrice = useRef<HTMLInputElement | null>(null);

    const [adsState, setAdsState] = useState(ads);

    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    useEffect(() => {}, []);

    const updateAdsState = (value: string, field: string) => {
        setAdsState({ ...adsState, [field]: value });
    };

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
                {viewMode === 'new' && (
                    <p className="ads-set__title">Новое объявление</p>
                )}

                {viewMode === 'edit' && (
                    <p className="ads-set__title">Редактировать объявление</p>
                )}

                <div className="ads-set__name-wrap">
                    <p className="ads-set__name-text">Название</p>
                    <input
                        ref={refName}
                        name="name-ads"
                        type="text"
                        className="ads-set__name"
                        placeholder="Введите название (обязательное поле)"
                        value={adsState.title}
                        onChange={(event) => {
                            handleChangeName();
                            updateAdsState(event.target.value, 'title');
                        }}
                    />
                </div>

                <div className="ads-set__description-wrap">
                    <p className="ads-set__description-text">Описание</p>
                    <textarea
                        ref={refDescription}
                        name="description-ads"
                        className="ads-set__description"
                        placeholder="Введите описание"
                        value={adsState.description}
                        onChange={(event) => {
                            updateAdsState(event.target.value, 'description');
                        }}
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
                            value={adsState.price ? adsState.price : ''}
                            onChange={(event) => {
                                updateAdsState(event.target.value, 'price');
                            }}
                        />
                        <p className="ads-set__price-valute">₽</p>
                    </div>
                </div>

                {viewMode === 'new' && (
                    <button
                        onClick={(e) => handleClickPublic(e)}
                        className={`ads-set__public blue-button${
                            isNotActiveButton ? '--not-active' : ''
                        }`}
                    >
                        Опубликовать
                    </button>
                )}

                {viewMode === 'edit' && (
                    <button
                        className={`ads-set__public blue-button${
                            isNotActiveButton ? '--not-active' : ''
                        }`}
                    >
                        Сохранить
                    </button>
                )}
            </form>
        </div>
    );
};
