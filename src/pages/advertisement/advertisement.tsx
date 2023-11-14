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

export const Advertisement = () => {
    const [currAds, setCurrAds] = useState<Ads | null>(null);
    const [isCommentsWindow, setIsCommetnsWindow] = useState<boolean>(false);
    const [comments, setComments] = useState<Comments[] | null>(null);

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
            {isCommentsWindow && comments && (
                <CommentsWindow
                    comments={comments}
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
                    />
                    <Description description={currAds.description} />
                </div>
            )}
        </div>
    );
};
