import { Link } from 'react-router-dom';
import { Advertisement } from '../../../../components/advertisement/advertisement';
import './products.scss';
import { useEffect, useState } from 'react';
import { Ads } from '../../../../interface/global';
import { useGetAllAdsByIdQuery } from '../../../../services/advertisment';

interface ProductsProps {
    userId: number;
    titleText: string;
}

export const Products: React.FC<ProductsProps> = ({ userId, titleText }) => {
    const { data, error, isLoading } = useGetAllAdsByIdQuery(userId);

    const [arrAds, setArrAds] = useState<Ads[] | null>(null);
    useEffect(() => {
        if (data) {
            setArrAds(data);
        }
    }, [data]);

    return (
        <div className="my-products">
            <h2 className="my-products__title">
                {arrAds?.length ? titleText : 'Пока нет объявлений'}
            </h2>
            <div className="advertisements">
                {arrAds && (
                    <div className="advertisements">
                        {arrAds.map((ads, index) => {
                            return (
                                <Link key={index} to={`/ads/${ads.id}`}>
                                    <Advertisement ads={ads} />
                                </Link>
                            );
                        })}
                    </div>
                )}
                {isLoading && <h1>Loading...</h1>}
                {error && <h1>Error...</h1>}
            </div>
        </div>
    );
};
