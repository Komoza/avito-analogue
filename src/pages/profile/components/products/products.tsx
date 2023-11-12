import { Link } from 'react-router-dom';
import { Advertisement } from '../../../../components/advertisement/advertisement';
import './products.scss';
import { useEffect, useState } from 'react';
import { Ads } from '../../../../interface/global';
import { getAllAds } from '../../../../api/ads';

interface ProductsProps {
    userId: number;
    titleText: string;
}

export const Products: React.FC<ProductsProps> = ({ userId, titleText }) => {
    const [arrAds, setArrAds] = useState<Ads[] | null>(null);
    useEffect(() => {
        const fetchData = () => {
            getAllAds(userId)
                .then((data) => {
                    setArrAds(data);
                })
                .catch((error) => {
                    console.error('Error fetching workout data:', error);
                });
        };

        fetchData();
    }, [userId]);

    return (
        <div className="my-products">
            <h2 className="my-products__title">{titleText}</h2>
            <div className="advertisements">
                {arrAds ? (
                    <div className="advertisements">
                        {arrAds.map((ads, index) => {
                            return (
                                <Link key={index} to={`/ads/${ads.id}`}>
                                    <Advertisement ads={ads} />
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
        </div>
    );
};
