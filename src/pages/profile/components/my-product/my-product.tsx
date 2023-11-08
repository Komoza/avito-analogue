import { Advertisement } from '../../../../components/advertisement/advertisement';
import './my-product.scss';

export const MyProduct = () => {
    return (
        <div className="my-product">
            <h2 className="my-product__title">Мои товары</h2>
            <div className="advertisements">
                <Advertisement />
                <Advertisement />
                <Advertisement />
                <Advertisement />
            </div>
        </div>
    );
};
