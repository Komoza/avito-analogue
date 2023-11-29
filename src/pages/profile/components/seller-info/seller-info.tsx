import { useSelector } from 'react-redux';
import { CallingButton } from '../../../../components/calling-button/calling-button';
import { host } from '../../../../constant';
import { User } from '../../../../interface/global';
import { formatDate } from '../../../../utils/advertisement';
import './seller-info.scss';
import { RootState } from '../../../../store/actions/types/types';

interface SellerInfoProps {
    userProfile: User;
}
export const SellerInfo: React.FC<SellerInfoProps> = ({ userProfile }) => {
    const isMobile = useSelector(
        (state: RootState) => state.otherState.isMobile
    );

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
                {userProfile.sells_from && (
                    <p className="seller-info__start">
                        {`Продает товары с ${formatDate(
                            userProfile.sells_from
                        )}`}
                    </p>
                )}
                {userProfile.phone && !isMobile && (
                    <CallingButton phoneNumber={userProfile.phone} />
                )}
            </div>

            {userProfile.phone && isMobile && (
                <CallingButton phoneNumber={userProfile.phone} />
            )}
        </div>
    );
};
