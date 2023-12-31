import { useEffect, useRef, useState } from 'react';
import { BackgorundDark } from '../background-dark/background-dark';
import './ads-setting.scss';
import { getTokenFromLocalStorage, updateToken } from '../../utils/token';
import { useNavigate } from 'react-router-dom';
import { Ads, Image } from '../../interface/global';
import {
    usePostAdsMutation,
    useUpdateAdsByIdMutation,
} from '../../services/advertisment';
import { isFetchBaseQueryError } from '../../helper';
import { CloseModal } from '../close-modal/close-modal';
import { PhotosEdit } from './photos';

interface AdsSettingProps {
    setIsAdsModal: (value: boolean) => void;
    viewMode: string;
    ads: {
        title: string;
        description: string;
        price: number | null;
        images: Image[];
        id: number;
    };
    setCurrAds?: (value: Ads) => void;
}

export const AdsSettingTextOnly: React.FC<AdsSettingProps> = ({
    setIsAdsModal,
    viewMode,
    ads,
    setCurrAds,
}) => {
    const [isNotActiveButtonPublic, setIsNotActiveButtonPublic] =
        useState<boolean>(true);
    const [isNotActiveButtonEdit, setIsNotActiveButtonEdit] =
        useState<boolean>(true);

    const [
        postAdsText,
        { data: dataPostAds, status: statusPostAds, error: errorPostAds },
    ] = usePostAdsMutation();

    const [
        updateAds,
        { data: dataUpdateAds, status: statusUpdateAds, error: errorUpdateAds },
    ] = useUpdateAdsByIdMutation();

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

    useEffect(() => {
        if (statusPostAds === 'fulfilled' && dataPostAds) {
            navigate(`/ads/${dataPostAds.id}`);
            setIsAdsModal(false);
        }

        if (
            isFetchBaseQueryError(errorPostAds) &&
            errorPostAds.status === 401
        ) {
            updateToken();
            if (refName.current && refDescription.current && refPrice.current) {
                if (refName.current.value) {
                    postAdsText({
                        token: getTokenFromLocalStorage(),
                        ads: {
                            title: refName.current.value,
                            description: refDescription.current.value,
                            price: refPrice.current.value
                                ? parseInt(refPrice.current.value)
                                : 0,
                        },
                    });
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusPostAds, errorPostAds]);

    useEffect(() => {
        if (statusUpdateAds === 'fulfilled' && dataUpdateAds && setCurrAds) {
            setCurrAds(dataUpdateAds);
            setIsAdsModal(false);
        }

        if (
            isFetchBaseQueryError(errorUpdateAds) &&
            errorUpdateAds.status === 401
        ) {
            updateToken();
            updateAds({
                ads: { ...adsState },
                token: getTokenFromLocalStorage(),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusUpdateAds]);

    const updateAdsState = (value: string, field: string) => {
        setAdsState({ ...adsState, [field]: value });
    };

    const handleClickPublic = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();

        if (refName.current && refDescription.current && refPrice.current) {
            if (refName.current.value) {
                postAdsText({
                    token: getTokenFromLocalStorage(),
                    ads: {
                        title: refName.current.value,
                        description: refDescription.current.value,
                        price: refPrice.current.value
                            ? parseInt(refPrice.current.value)
                            : 0,
                    },
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
                setIsNotActiveButtonPublic(false);
            } else {
                setIsNotActiveButtonPublic(true);
            }
        }
    };

    const handleClickEditButton = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        updateAds({ ads: { ...adsState }, token: getTokenFromLocalStorage() });
    };

    useEffect(() => {
        changeButton();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [adsState]);

    const changeButton = () => {
        for (const key in adsState) {
            if (key === 'price') {
                if (Number(adsState[key]) !== ads[key]) {
                    setIsNotActiveButtonEdit(false);
                    return;
                }
            } else if (
                adsState[
                    key as keyof {
                        title: string;
                        description: string;
                        price: number | null;
                        images: Image[];
                        id: number;
                    }
                ] !==
                ads[
                    key as keyof {
                        title: string;
                        description: string;
                        price: number | null;
                        images: Image[];
                        id: number;
                    }
                ]
            ) {
                setIsNotActiveButtonEdit(false);
                return;
            }
        }
        setIsNotActiveButtonEdit(true);
        return;
    };

    return (
        <div className="ads-setting">
            <BackgorundDark closeModal={setIsAdsModal} />
            <form className="ads-set">
                <CloseModal setIsModalWindow={setIsAdsModal} />
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

                {viewMode === 'edit' && setCurrAds && (
                    <PhotosEdit ads={ads} setCurrAds={setCurrAds} />
                )}
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
                            isNotActiveButtonPublic ? '--not-active' : ''
                        }`}
                    >
                        Опубликовать
                    </button>
                )}

                {viewMode === 'edit' && (
                    <button
                        onClick={(event) => handleClickEditButton(event)}
                        className={`ads-set__public blue-button${
                            isNotActiveButtonEdit ? '--not-active' : ''
                        }`}
                    >
                        Сохранить
                    </button>
                )}
            </form>
        </div>
    );
};
