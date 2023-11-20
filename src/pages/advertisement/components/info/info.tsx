import { Link, useNavigate } from 'react-router-dom';
import './info.scss';
import { Ads, Comments } from '../../../../interface/global';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { correctMessage, formatDate } from '../../../../utils/advertisement';
import { host } from '../../../../constant';
import { CallingButton } from '../../../../components/calling-button/calling-button';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/actions/types/types';
import { getTokenFromLocalStorage } from '../../../../utils/token';
import { deleteAdsById } from '../../../../api/ads';

interface AdsInfoProps {
    currAds: Ads;
    comments: Comments[] | null;
    setIsCommetnsWindow: (value: boolean) => void;
    setIsAdsModal: (value: boolean) => void;
}
export const Info: React.FC<AdsInfoProps> = ({
    currAds,
    comments,
    setIsCommetnsWindow,
    setIsAdsModal,
}) => {
    const userIdState = useSelector(
        (state: RootState) => state.otherState.userId
    );
    const navigate = useNavigate();

    const handleClickComments = () => {
        setIsCommetnsWindow(true);
    };

    const handleClickEditAds = () => {
        setIsAdsModal(true);
    };
    const handleClickDeleteAds = () => {
        deleteAdsById(currAds.id.toString(), getTokenFromLocalStorage())
            .then(() => {
                navigate('/profile/me');
            })
            .catch((error) => console.error(error));
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

            {comments && (
                <p className="info__reviews">
                    <button
                        onClick={handleClickComments}
                        className="info__reviews-button"
                    >
                        {correctMessage(comments.length)}{' '}
                    </button>
                </p>
            )}

            <div className="info__price">{`${currAds.price}  ₽`}</div>

            {userIdState !== currAds.user_id ? (
                currAds.user.phone && (
                    <CallingButton phoneNumber={currAds.user.phone} />
                )
            ) : (
                <div className="info__edit-buttons">
                    <button
                        onClick={handleClickEditAds}
                        className="info__edit-ads blue-button"
                    >
                        Редактировать
                    </button>
                    <button
                        onClick={handleClickDeleteAds}
                        className="info__remove-ads blue-button"
                    >
                        Снять с публикации
                    </button>
                </div>
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
