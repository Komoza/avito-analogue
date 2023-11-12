import { Link } from 'react-router-dom';
import './info.scss';
import { Ads } from '../../../../interface/global';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { formatDate } from '../../../../utils/advertisement';
import { host } from '../../../../constant';
import { CallingButton } from '../../../../components/calling-button/calling-button';

interface AdsInfoProps {
    currAds: Ads;
}
export const Info: React.FC<AdsInfoProps> = ({ currAds }) => {
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
                <CallingButton phoneNumber={currAds.user.phone} />
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
                    <Link
                        className="seller__name-link"
                        to={`/profile/${currAds.user_id}`}
                    >
                        <p className="seller__name">{currAds.user.name}</p>
                    </Link>

                    {currAds.user.sells_from && (
                        <p className="seller__start">{`Продает товары с ${formatDate(
                            currAds.user.sells_from
                        )}`}</p>
                    )}
                </div>
            </div>
        </div>
    );
};
