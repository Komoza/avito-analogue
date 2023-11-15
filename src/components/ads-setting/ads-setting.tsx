import { useEffect } from 'react';
import { BackgorundDark } from '../background-dark/background-dark';
import './ads-setting.scss';

interface AdsSettingProps {
    setIsAdsModal: (value: boolean) => void;
}

export const AdsSetting: React.FC<AdsSettingProps> = ({ setIsAdsModal }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="ads-setting">
            <BackgorundDark closeModal={setIsAdsModal} />
            <form className="ads-set">
                <p className="ads-set__title">Новое объявление</p>

                <div className="ads-set__name-wrap">
                    <p className="ads-set__name-text">Название</p>
                    <input
                        name="name-ads"
                        type="text"
                        className="ads-set__name"
                        placeholder="Введите название"
                    />
                </div>

                <div className="ads-set__description-wrap">
                    <p className="ads-set__description-text">Описание</p>
                    <textarea
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
                        <img
                            src="/image/add-photo.jpg"
                            alt="Добавить фото"
                            className="ads-set__photo"
                        />
                        <img
                            src="/image/add-photo.jpg"
                            alt=""
                            className="ads-set__photo"
                        />
                        <img
                            src="/image/add-photo.jpg"
                            alt=""
                            className="ads-set__photo"
                        />
                        <img
                            src="/image/add-photo.jpg"
                            alt=""
                            className="ads-set__photo"
                        />
                        <img
                            src="/image/add-photo.jpg"
                            alt=""
                            className="ads-set__photo"
                        />
                    </div>
                </div>

                <div className="ads-set__price-wrap">
                    <div className="ads-set__price-text">Цена</div>
                    <div className="ads-set__price-box">
                        <input
                            type="number"
                            className="ads-set__price"
                            placeholder="0"
                        />
                        <p className="ads-set__price-valute">₽</p>
                    </div>
                </div>

                <button className="ads-set__public blue-button">
                    Опубликовать
                </button>
            </form>
        </div>
    );
};
