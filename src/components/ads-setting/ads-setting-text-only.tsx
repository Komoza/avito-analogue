import { useEffect, useRef, useState } from 'react';
import { BackgorundDark } from '../background-dark/background-dark';
import './ads-setting.scss';
import { getTokenFromLocalStorage, updateToken } from '../../utils/token';
import { useNavigate } from 'react-router-dom';
import { Ads, Image } from '../../interface/global';
import { host } from '../../constant';
import {
    useDeleteAdsImageMutation,
    usePostAdsImageMutation,
    usePostAdsMutation,
    useUpdateAdsByIdMutation,
} from '../../services/advertisment';
import { isFetchBaseQueryError } from '../../helper';

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

    const [
        postAdsImage,
        {
            data: dataPostAdsImage,
            status: statusPostAdsImage,
            error: errorPostAdsImage,
        },
    ] = usePostAdsImageMutation();

    const [
        deleteAdsImage,
        {
            data: dataDeleteAdsImage,
            status: statusDeleteAdsImage,
            error: errorDeleteAdsImage,
        },
    ] = useDeleteAdsImageMutation();

    const refName = useRef<HTMLInputElement | null>(null);
    const refDescription = useRef<HTMLTextAreaElement | null>(null);
    const refPrice = useRef<HTMLInputElement | null>(null);
    const refImage = useRef<HTMLInputElement | null>(null);

    const [imagesState, setImagesState] = useState<string[]>([
        '/image/add-photo.jpg',
        '/image/add-photo.jpg',
        '/image/add-photo.jpg',
        '/image/add-photo.jpg',
        '/image/add-photo.jpg',
    ]);

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

    useEffect(() => {
        if (
            statusPostAdsImage === 'fulfilled' &&
            dataPostAdsImage &&
            setCurrAds
        ) {
            setCurrAds(dataPostAdsImage);
        }

        if (
            isFetchBaseQueryError(errorPostAdsImage) &&
            errorPostAdsImage.status === 401
        ) {
            updateToken();
            handlePostImage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusPostAdsImage, errorPostAdsImage]);

    useEffect(() => {
        if (
            statusDeleteAdsImage === 'fulfilled' &&
            dataDeleteAdsImage &&
            setCurrAds
        ) {
            setCurrAds(dataDeleteAdsImage);
        }

        if (
            isFetchBaseQueryError(errorDeleteAdsImage) &&
            errorDeleteAdsImage.status === 401
        ) {
            updateToken();
            // придумать как вызвать удаление еще раз
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusDeleteAdsImage, errorDeleteAdsImage]);

    useEffect(() => {
        const newArrImages = [
            '/image/add-photo.jpg',
            '/image/add-photo.jpg',
            '/image/add-photo.jpg',
            '/image/add-photo.jpg',
            '/image/add-photo.jpg',
        ];

        ads.images.forEach((image, index) => {
            if (image) {
                if (!isNaN(image.id)) {
                    newArrImages[index] = `${host}/${image.url}`;
                }
            }
        });

        setImagesState(newArrImages);
    }, [ads]);

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

    const handleClickImage = () => {
        refImage.current?.click();
    };

    const handlePostImage = () => {
        if (refImage.current?.files) {
            const file = refImage.current.files[0];
            const formData = new FormData();
            formData.append('file', file);

            postAdsImage({
                token: getTokenFromLocalStorage(),
                image: formData,
                adsId: ads.id,
            });
        }
    };

    const handleClickDeleteImage = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        imageUrl: string
    ) => {
        event.preventDefault();
        deleteAdsImage({
            token: getTokenFromLocalStorage(),
            imageUrl: imageUrl,
            adsId: ads.id,
        });
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

                {viewMode === 'edit' && (
                    <div className="ads-set__photos-wrap">
                        <div className="ads-set__photos-text-wrap">
                            <p className="ads-set__photos-text">
                                Фотографии товара
                            </p>
                            <p className="ads-set__photos-description">
                                не более 5 фотографий
                            </p>
                        </div>

                        <div className="ads-set__photo-wrap">
                            <input
                                ref={refImage}
                                onChange={handlePostImage}
                                className="ads-set__photo--input"
                                type="file"
                                accept="image/png, image/jpeg"
                            />
                            {imagesState.map((image, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="ads-set__img-wrap"
                                    >
                                        {image !== '/image/add-photo.jpg' && (
                                            <button
                                                onClick={(event) =>
                                                    handleClickDeleteImage(
                                                        event,
                                                        image
                                                    )
                                                }
                                                className="ads-set__img-delete"
                                            >
                                                x
                                            </button>
                                        )}
                                        <img
                                            onClick={handleClickImage}
                                            src={image}
                                            alt=""
                                            className="ads-set__photo"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
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
