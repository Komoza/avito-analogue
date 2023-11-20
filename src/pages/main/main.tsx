import { Link } from 'react-router-dom';
import { Advertisement } from '../../components/advertisement/advertisement';
import { SearchBar } from './components/search-bar/search-bar';
import { Title } from './components/title/titile';
import './main.scss';
import { Header } from '../../components/header/header';
import { useGetAllAdsQuery } from '../../services/advertisment';

export const Main = () => {
    const { data: arrAds, error, isLoading } = useGetAllAdsQuery();

    return (
        <div className="main">
            <Header />
            <SearchBar />
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

            {isLoading && <h1>Loading...</h1>}

            {error && <h1>Error...</h1>}
        </div>
    );
};
