import { Link } from 'react-router-dom';
import { Advertisement } from '../../components/advertisement/advertisement';
import { SearchBar } from './components/search-bar/search-bar';
import { Title } from './components/title/titile';
import './main.scss';
import { getAllAds } from '../../api/ads';
import { useEffect, useState } from 'react';
import { Ads } from '../../interface/global';
import { Header } from '../../components/header/header';

export const Main = () => {
    const [arrAds, setArrAds] = useState<Ads[] | null>(null);

    useEffect(() => {
        const fetchData = () => {
            getAllAds(null)
                .then((data) => {
                    setArrAds(data);
                })
                .catch((error) => {
                    console.error('Error fetching workout data:', error);
                });
        };

        fetchData();
    }, []);
    return (
        <div className="main">
            <Header />
            <SearchBar />
            <Title />
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
    );
};
