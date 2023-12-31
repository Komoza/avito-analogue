import './photos.scss';
import { useEffect, useState } from 'react';

// Swiper
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Image } from '../../../../interface/global';
import { host } from '../../../../constant';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/actions/types/types';

interface PhotosProps {
    images: Image[];
}

export const Photos: React.FC<PhotosProps> = ({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const [indexActiveThums, setIndexActiveThumbs] = useState<number>(0);
    const [imageState, setIsImageState] = useState<Image[]>([]);

    const isMobile = useSelector(
        (state: RootState) => state.otherState.isMobile
    );

    const handleClickSlide = (index: number) => {
        if (thumbsSwiper) {
            const slidesPerView = thumbsSwiper.params.slidesPerView;

            if (typeof slidesPerView === 'number' && !isNaN(slidesPerView)) {
                const targetIndex = index - Math.floor(slidesPerView / 2);
                thumbsSwiper.slideTo(targetIndex, 300);
                setIndexActiveThumbs(index);
            }
        }
    };

    useEffect(() => {
        if (!images.length) {
            setIsImageState([
                {
                    id: NaN,
                    url: '/image/no-image.png',
                    ad_id: NaN,
                },
            ]);
        } else {
            setIsImageState([...images]);
        }
    }, [images]);

    return (
        <div className="photos">
            <Swiper
                pagination={isMobile ? true : false}
                spaceBetween={10}
                thumbs={{
                    swiper:
                        thumbsSwiper && !thumbsSwiper.destroyed
                            ? thumbsSwiper
                            : null,
                }}
                className="photos__main-slide"
                modules={[FreeMode, Navigation, Thumbs, Pagination]}
            >
                {imageState.map((image, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <img
                                src={
                                    isNaN(image.id)
                                        ? image.url
                                        : `${host}/${image.url}`
                                }
                                className="photos__main-slide-img"
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            {!isMobile && (
                <div className="photos__thumbs-wrapper">
                    <Swiper
                        onSwiper={(e) => {
                            if (e) {
                                setThumbsSwiper(e);
                            }
                        }}
                        spaceBetween={10}
                        slidesPerView={5}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                    >
                        {imageState.map((image, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <img
                                        src={
                                            isNaN(image.id)
                                                ? image.url
                                                : `${host}/${image.url}`
                                        }
                                        className={`photos__swipe-slide-img ${
                                            index === indexActiveThums &&
                                            'photos__swipe-slide-img--active'
                                        }`}
                                        onClick={() => handleClickSlide(index)}
                                    />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            )}
        </div>
    );
};
