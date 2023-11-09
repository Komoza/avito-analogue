import './photos.scss';
import { useState } from 'react';

// Swiper
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Image } from '../../../../interface/global';
import { host } from '../../../../constant';

interface PhotosProps {
    images: Image[];
}

export const Photos: React.FC<PhotosProps> = ({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const [indexActiveThums, setIndexActiveThumbs] = useState<number>(0);

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

    if (!images.length) {
        images.push({
            id: NaN,
            url: '/image/no-image.png',
            ad_id: NaN,
        });
    }

    return (
        <div className="photos">
            <Swiper
                spaceBetween={10}
                thumbs={{
                    swiper:
                        thumbsSwiper && !thumbsSwiper.destroyed
                            ? thumbsSwiper
                            : null,
                }}
                className="photos__main-slide"
                modules={[FreeMode, Navigation, Thumbs]}
            >
                {images.map((image, index) => {
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
                    {images.map((image, index) => {
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
        </div>
    );
};
