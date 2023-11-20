import { BackToMain } from '../../components/back-to-main/back-to-main';
import './advertisement.scss';
import { Photos } from './components/photos/photos';
import { Info } from './components/info/info';
import { Description } from './components/description/dexcription';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAdsById, getAllComments } from '../../api/ads';
import { Ads, Comments } from '../../interface/global';
import { CommentsWindow } from './components/comments/comments';
import { Header } from '../../components/header/header';
import { AdsSettingTextOnly } from '../../components/ads-setting/ads-setting-text-only';

export const Advertisement = () => {
    const [currAds, setCurrAds] = useState<Ads | null>(null);
    const [isCommentsWindow, setIsCommetnsWindow] = useState<boolean>(false);
    const [comments, setComments] = useState<Comments[] | null>(null);
    const [isAdsModal, setIsAdsModal] = useState<boolean>(false);

    const adsId = useParams().id;

    useEffect(() => {
        const fetchData = () => {
            if (adsId) {
                getAdsById(adsId)
                    .then((data) => {
                        setCurrAds(data);
                        getAllComments(data.id)
                            .then((dataComments) => {
                                setComments(dataComments);
                            })
                            .catch((error) => {
                                console.error(error.message);
                            });
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
            <Header />

            {isAdsModal && currAds && (
                <AdsSettingTextOnly
                    setIsAdsModal={setIsAdsModal}
                    viewMode="edit"
                    ads={{
                        id: currAds.id,
                        title: currAds.title,
                        description: currAds.description,
                        price: currAds.price,
                        images: [...currAds.images],
                    }}
                    setCurrAds={setCurrAds}
                />
            )}

            {isCommentsWindow && currAds && comments && (
                <CommentsWindow
                    sellerId={currAds.user_id}
                    comments={comments}
                    setComments={setComments}
                    setIsCommetnsWindow={setIsCommetnsWindow}
                />
            )}
            <BackToMain />
            {currAds && (
                <div className="advertisement-info">
                    <Photos images={currAds.images} />
                    <Info
                        currAds={currAds}
                        comments={comments}
                        setIsCommetnsWindow={setIsCommetnsWindow}
                        setIsAdsModal={setIsAdsModal}
                    />
                    <Description description={currAds.description} />
                </div>
            )}
        </div>
    );
};
