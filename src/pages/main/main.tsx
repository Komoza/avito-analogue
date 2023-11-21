import { Link } from 'react-router-dom';
import { Advertisement } from '../../components/advertisement/advertisement';
import { SearchBar } from './components/search-bar/search-bar';
import { Title } from './components/title/titile';
import './main.scss';
import { Header } from '../../components/header/header';
import { useGetAllAdsQuery } from '../../services/advertisment';
import { useEffect, useState } from 'react';
import { Ads } from '../../interface/global';
import { AdvertisementSkeleton } from '../../components/skeleton/advertisement-card';

export const Main = () => {
    const { data, error, isLoading } = useGetAllAdsQuery();
    const [arrAds, setArrAds] = useState<Ads[] | null>(null);

    useEffect(() => {
        if (data) {
            setArrAds(data);
        }
    }, [data]);

    return (
        <div className="main">
            <Header />
            {data && <SearchBar setArrAds={setArrAds} dataAds={data} />}
            <Title />
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

            {isLoading && (
                <div className="advertisements">
                    <AdvertisementSkeleton />
                    <AdvertisementSkeleton />
                    <AdvertisementSkeleton />
                    <AdvertisementSkeleton />
                    <AdvertisementSkeleton />
                    <AdvertisementSkeleton />
                    <AdvertisementSkeleton />
                    <AdvertisementSkeleton />
                </div>
            )}

            {error && <p className="main__error">Объявления не найдены</p>}
        </div>
    );
};
