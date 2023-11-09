import { BackToMain } from '../../components/back-to-main/back-to-main';
import './advertisement.scss';
import { Photos } from './components/photos/photos';
import { Info } from './components/info/info';
import { Description } from './components/description/dexcription';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAdsById } from '../../api/ads';
import { Ads } from '../../interface/global';

export const Advertisement = () => {
    const [currAds, setCurrAds] = useState<Ads | null>(null);
    const adsId = useParams().id;

    useEffect(() => {
        const fetchData = () => {
            if (adsId) {
                getAdsById(adsId)
                    .then((data) => {
                        setCurrAds(data);
                    })
                    .catch((error) => {
                        console.error('Error fetching workout data:', error);
                    });
            }
        };

        fetchData();
    }, [adsId]);

    return (
        <div className="advertisement">
            <BackToMain />
            {currAds && (
                <div className="advertisement-info">
                    <Photos images={currAds.images} />
                    <Info currAds={currAds} />
                    <Description description={currAds.description} />
                </div>
            )}
        </div>
    );
};
