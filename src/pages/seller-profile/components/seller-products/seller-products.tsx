import { Link } from 'react-router-dom';
import { Advertisement } from '../../../../components/advertisement/advertisement';
import './seller-products.scss';

export const SellerProducts = () => {
    return (
        <div className="seller-products">
            <h2 className="seller-products__title">Товары продавца</h2>
            <div className="advertisements">
                <Link to={'/advertisement'}>
                    <Advertisement />
                </Link>
                <Link to={'/advertisement'}>
                    <Advertisement />
                </Link>
                <Link to={'/advertisement'}>
                    <Advertisement />
                </Link>
                <Link to={'/advertisement'}>
                    <Advertisement />
                </Link>
            </div>
        </div>
    );
};
