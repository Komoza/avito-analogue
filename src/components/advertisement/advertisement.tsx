import { formatDistanceToNow } from 'date-fns';
import { host } from '../../api/ads';
import { Ads, checkTitleLength } from '../../constant';
import './advertisement.scss';
import { ru } from 'date-fns/locale';

interface AdvertisementProps {
    ads: Ads;
}
export const Advertisement: React.FC<AdvertisementProps> = ({ ads }) => {
    return (
        ads && (
            <div className="advertisement-wrap">
                <img
                    src={
                        ads.images.length
                            ? `${host}/${ads.images[0].url}`
                            : '/image/no-image.png'
                    }
                    alt="фото объявления"
                    className="advertisement-wrap__image"
                />

                <div className="advertisement-wrap__details details">
                    <p className="details__name">
                        {checkTitleLength(ads.title)}
                    </p>
                    <p className="details__price">{ads.price} ₽</p>
                    <div className="details__from from">
                        <p className="from__location">{ads.user.city}</p>
                        <p className="from__date">
                            {formatDistanceToNow(new Date(ads.created_on), {
                                addSuffix: true,
                                locale: ru,
                            })}
                        </p>
                    </div>
                </div>
            </div>
        )
    );
};
