import { CallingButton } from '../../../../components/calling-button/calling-button';
import { host } from '../../../../constant';
import { User } from '../../../../interface/global';
import { formatDate } from '../../../../utils/advertisement';
import './seller-info.scss';

interface SellerInfoProps {
    userProfile: User;
}
export const SellerInfo: React.FC<SellerInfoProps> = ({ userProfile }) => {
    return (
        <div className="seller-info">
            <img
                src={
                    userProfile.avatar
                        ? `${host}/${userProfile.avatar}`
                        : '/image/no-avatar.png'
                }
                alt="avatar"
                className="seller-info__avatar"
            />
            <div className="seller-info__data">
                <p className="seller-info__fullname">{userProfile.name}</p>
                <p className="seller-info__city">{userProfile.city}</p>
                <p className="seller-info__start">
                    {`Продает товары с ${formatDate(userProfile.sells_from)}`}
                </p>
                {userProfile.phone && (
                    <CallingButton phoneNumber={userProfile.phone} />
                )}
            </div>
        </div>
    );
};
