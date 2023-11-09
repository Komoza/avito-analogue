import { Link } from 'react-router-dom';
import './info.scss';
import { Ads } from '../../../../interface/global';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { formatDate, formateNumber } from '../../../../utils/advertisement';
import { host } from '../../../../constant';
import { useState } from 'react';

interface AdsInfoProps {
    currAds: Ads;
}
export const Info: React.FC<AdsInfoProps> = ({ currAds }) => {
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
        <div className="info">
            <p className="info__name">{currAds.title}</p>

            <div className="info__from">
                <p className="info__date">
                    {formatDistanceToNow(new Date(currAds.created_on), {
                        addSuffix: true,
                        locale: ru,
                    })}
                </p>
                <p className="info__location">{currAds.user.city}</p>
            </div>

            <p className="info__reviews">
                <a>??? отзыва</a>
            </p>

            <div className="info__price">{`${currAds.price}  ₽`}</div>

            {currAds.user.phone && (
                <>
                    {isHiddenPhone ? (
                        <button
                            className="info__show-phone blue-button"
                            onClick={handleClickShowPhone}
                        >
                            Показать телефон <br />
                            {formateNumber(currAds.user.phone)}
                        </button>
                    ) : (
                        <button
                            className="info__call blue-button"
                            onClick={() => {
                                handleClickCallPhone(currAds.user.phone);
                            }}
                        >
                            Позвонить <br />
                            {currAds.user.phone}
                        </button>
                    )}
                </>
            )}

            <div className="info__seller seller">
                <img
                    src={
                        currAds.user.avatar
                            ? `${host}/${currAds.user.avatar}`
                            : '/image/no-avatar.png'
                    }
                    alt="photo"
                    className="seller__avatar"
                />
                <div className="seller__info">
                    <Link to={'/profile'}>
                        <p className="seller__name">{currAds.user.name}</p>
                    </Link>

                    <p className="seller__start">{`Продает товары с ${formatDate(
                        currAds.user.sells_from
                    )}`}</p>
                </div>
            </div>
        </div>
    );
};
