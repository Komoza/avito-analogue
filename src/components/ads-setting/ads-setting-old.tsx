import { useEffect, useRef, useState } from 'react';
import { BackgorundDark } from '../background-dark/background-dark';
import './ads-setting.scss';
import { getTokenFromLocalStorage } from '../../utils/token';
import { postAds } from '../../api/ads';
import { useNavigate } from 'react-router-dom';

interface AdsSettingProps {
    setIsAdsModal: (value: boolean) => void;
}

export const AdsSetting: React.FC<AdsSettingProps> = ({ setIsAdsModal }) => {
    const navigate = useNavigate();

    const [isNotActiveButton, setIsNotActiveButton] = useState<boolean>(true);

    const refName = useRef<HTMLInputElement | null>(null);
    const refDescription = useRef<HTMLTextAreaElement | null>(null);
    const refPrice = useRef<HTMLInputElement | null>(null);

    const refPhoto1 = useRef<HTMLInputElement | null>(null);
    const refPhoto2 = useRef<HTMLInputElement | null>(null);
    const refPhoto3 = useRef<HTMLInputElement | null>(null);
    const refPhoto4 = useRef<HTMLInputElement | null>(null);
    const refPhoto5 = useRef<HTMLInputElement | null>(null);

    const [image1, setImage1] = useState<string>('/image/add-photo.jpg');
    const [image2, setImage2] = useState<string>('/image/add-photo.jpg');
    const [image3, setImage3] = useState<string>('/image/add-photo.jpg');
    const [image4, setImage4] = useState<string>('/image/add-photo.jpg');
    const [image5, setImage5] = useState<string>('/image/add-photo.jpg');

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
                const arrImages: FormData[] = [];

                if (refPhoto1.current?.files) {
                    const file = refPhoto1.current.files[0];
                    const formData = new FormData();
                    formData.append('file', file);

                    arrImages.push(formData);

                    postAds(
                        {
                            title: refName.current.value,
                            description: refDescription.current.value,
                            price: refPrice.current.value
                                ? parseInt(refPrice.current.value)
                                : 0,
                        },
                        getTokenFromLocalStorage(),
                        arrImages
                    )
                        .then((data) => {
                            navigate(`/ads/${data.id}`);
                            setIsAdsModal(false);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
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

    const handleCLickPhoto = (num: number) => {
        switch (num) {
            case 1:
                if (refPhoto1.current) {
                    refPhoto1.current.click();
                }
                return;
            case 2:
                if (refPhoto2.current) {
                    refPhoto2.current.click();
                }
                return;
            case 3:
                if (refPhoto3.current) {
                    refPhoto3.current.click();
                }
                return;
            case 4:
                if (refPhoto4.current) {
                    refPhoto4.current.click();
                }
                return;
            case 5:
                if (refPhoto5.current) {
                    refPhoto5.current.click();
                }
                return;
            default:
                return;
        }
    };

    const handleChangePhoto = (num: number) => {
        let file;
        switch (num) {
            case 1:
                if (refPhoto1?.current?.files) {
                    file = refPhoto1.current.files[0];

                    if (file) {
                        const reader = new FileReader();

                        reader.onloadend = () => {
                            setImage1(reader.result as string);
                        };

                        reader.readAsDataURL(file);
                    }
                }

                return;

            case 2:
                if (refPhoto2?.current?.files) {
                    file = refPhoto2.current.files[0];

                    if (file) {
                        const reader = new FileReader();

                        reader.onloadend = () => {
                            setImage2(reader.result as string);
                        };

                        reader.readAsDataURL(file);
                    }
                }

                return;

            case 3:
                if (refPhoto3?.current?.files) {
                    file = refPhoto3.current.files[0];

                    if (file) {
                        const reader = new FileReader();

                        reader.onloadend = () => {
                            setImage3(reader.result as string);
                        };

                        reader.readAsDataURL(file);
                    }
                }

                return;

            case 4:
                if (refPhoto4?.current?.files) {
                    file = refPhoto4.current.files[0];

                    if (file) {
                        const reader = new FileReader();

                        reader.onloadend = () => {
                            setImage4(reader.result as string);
                        };

                        reader.readAsDataURL(file);
                    }
                }

                return;

            case 5:
                if (refPhoto5?.current?.files) {
                    file = refPhoto5.current.files[0];

                    if (file) {
                        const reader = new FileReader();

                        reader.onloadend = () => {
                            setImage5(reader.result as string);
                        };

                        reader.readAsDataURL(file);
                    }
                }

                return;
            default:
                return;
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
                            ref={refPhoto1}
                            onChange={() => handleChangePhoto(1)}
                            className="ads-set__photo--input"
                            type="file"
                            accept="image/png, image/jpeg"
                        />
                        <img
                            onClick={() => {
                                handleCLickPhoto(1);
                            }}
                            src={image1}
                            alt="Добавить фото"
                            className="ads-set__photo"
                        />
                        <input
                            ref={refPhoto2}
                            onChange={() => handleChangePhoto(2)}
                            className="ads-set__photo--input"
                            type="file"
                            accept="image/png, image/jpeg"
                        />
                        <img
                            onClick={() => {
                                handleCLickPhoto(2);
                            }}
                            src={image2}
                            alt=""
                            className="ads-set__photo"
                        />
                        <input
                            ref={refPhoto3}
                            onChange={() => handleChangePhoto(3)}
                            className="ads-set__photo--input"
                            type="file"
                            accept="image/png, image/jpeg"
                        />
                        <img
                            onClick={() => {
                                handleCLickPhoto(3);
                            }}
                            src={image3}
                            alt=""
                            className="ads-set__photo"
                        />
                        <input
                            ref={refPhoto4}
                            onChange={() => handleChangePhoto(4)}
                            className="ads-set__photo--input"
                            type="file"
                            accept="image/png, image/jpeg"
                        />
                        <img
                            onClick={() => {
                                handleCLickPhoto(4);
                            }}
                            src={image4}
                            alt=""
                            className="ads-set__photo"
                        />
                        <input
                            ref={refPhoto5}
                            onChange={() => handleChangePhoto(5)}
                            className="ads-set__photo--input"
                            type="file"
                            accept="image/png, image/jpeg"
                        />
                        <img
                            onClick={() => {
                                handleCLickPhoto(5);
                            }}
                            src={image5}
                            alt=""
                            className="ads-set__photo"
                        />
                    </div>
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
