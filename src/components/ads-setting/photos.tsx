import { useEffect, useRef, useState } from 'react';
import './ads-setting.scss';
import { Ads, Image } from '../../interface/global';
import { host } from '../../constant';
import {
    useDeleteAdsImageMutation,
    usePostAdsImageMutation,
} from '../../services/advertisment';
import { getTokenFromLocalStorage, updateToken } from '../../utils/token';
import { isFetchBaseQueryError } from '../../helper';

interface PhotosEditProps {
    ads: {
        title: string;
        description: string;
        price: number | null;
        images: Image[];
        id: number;
    };
    setCurrAds: (value: Ads) => void;
}

export const PhotosEdit: React.FC<PhotosEditProps> = ({ ads, setCurrAds }) => {
    const refImage = useRef<HTMLInputElement | null>(null);

    const [imagesState, setImagesState] = useState<string[]>([
        '/image/add-photo.jpg',
        '/image/add-photo.jpg',
        '/image/add-photo.jpg',
        '/image/add-photo.jpg',
        '/image/add-photo.jpg',
    ]);

    const [
        postAdsImage,
        {
            data: dataPostAdsImage,
            status: statusPostAdsImage,
            error: errorPostAdsImage,
        },
    ] = usePostAdsImageMutation();

    const [
        deleteAdsImage,
        {
            data: dataDeleteAdsImage,
            status: statusDeleteAdsImage,
            error: errorDeleteAdsImage,
        },
    ] = useDeleteAdsImageMutation();

    useEffect(() => {
        const newArrImages = [
            '/image/add-photo.jpg',
            '/image/add-photo.jpg',
            '/image/add-photo.jpg',
            '/image/add-photo.jpg',
            '/image/add-photo.jpg',
        ];

        ads.images.forEach((image, index) => {
            if (image) {
                if (!isNaN(image.id)) {
                    newArrImages[index] = `${host}/${image.url}`;
                }
            }
        });

        setImagesState(newArrImages);
    }, [ads]);

    useEffect(() => {
        if (
            statusPostAdsImage === 'fulfilled' &&
            dataPostAdsImage &&
            setCurrAds
        ) {
            setCurrAds(dataPostAdsImage);
        }

        if (
            isFetchBaseQueryError(errorPostAdsImage) &&
            errorPostAdsImage.status === 401
        ) {
            updateToken();
            handlePostImage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusPostAdsImage, errorPostAdsImage]);

    useEffect(() => {
        if (
            statusDeleteAdsImage === 'fulfilled' &&
            dataDeleteAdsImage &&
            setCurrAds
        ) {
            setCurrAds(dataDeleteAdsImage);
        }

        if (
            isFetchBaseQueryError(errorDeleteAdsImage) &&
            errorDeleteAdsImage.status === 401
        ) {
            updateToken();
            // придумать как вызвать удаление еще раз
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusDeleteAdsImage, errorDeleteAdsImage]);

    const handleClickImage = (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => {
        if (e.currentTarget.src.includes('/image/add-photo.jpg')) {
            refImage.current?.click();
        }
    };

    const handlePostImage = () => {
        if (refImage.current?.files) {
            const file = refImage.current.files[0];
            const formData = new FormData();
            formData.append('file', file);

            postAdsImage({
                token: getTokenFromLocalStorage(),
                image: formData,
                adsId: ads.id,
            });
        }
    };

    const handleClickDeleteImage = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        imageUrl: string
    ) => {
        event.preventDefault();
        deleteAdsImage({
            token: getTokenFromLocalStorage(),
            imageUrl: imageUrl,
            adsId: ads.id,
        });
    };

    return (
        <div className="ads-set__photos-wrap">
            <div className="ads-set__photos-text-wrap">
                <p className="ads-set__photos-text">Фотографии товара</p>
                <p className="ads-set__photos-description">
                    не более 5 фотографий
                </p>
            </div>

            <div className="ads-set__photo-wrap">
                <input
                    ref={refImage}
                    onChange={handlePostImage}
                    className="ads-set__photo--input"
                    type="file"
                    accept="image/png, image/jpeg"
                />
                {imagesState.map((image, index) => {
                    return (
                        <div key={index} className="ads-set__img-wrap">
                            {image !== '/image/add-photo.jpg' && (
                                <button
                                    onClick={(event) =>
                                        handleClickDeleteImage(event, image)
                                    }
                                    className="ads-set__img-delete"
                                >
                                    x
                                </button>
                            )}
                            <img
                                onClick={(e) => handleClickImage(e)}
                                src={image}
                                alt=""
                                className="ads-set__photo"
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
