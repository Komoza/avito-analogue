import { Link } from 'react-router-dom';
import { Advertisement } from '../../../../components/advertisement/advertisement';
import './my-products.scss';

export const MyProducts = () => {
    return (
        <div className="my-products">
            <h2 className="my-products__title">Мои товары</h2>
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
