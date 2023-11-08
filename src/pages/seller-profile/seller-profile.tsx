import { BackToMain } from '../../components/back-to-main/back-to-main';
import { SellerProfileInfo } from './components/info/info';
import { SellerProducts } from './components/seller-products/seller-products';
import { Title } from './components/title/title';
import './seller-profile.scss';

export const SellerProfile = () => {
    return (
        <div className="seller-profile">
            <BackToMain />
            <Title />
            <SellerProfileInfo />
            <SellerProducts />
        </div>
    );
};
