import './photos.scss';
import { useState } from 'react';

// Swiper
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

const images = [
    '/image/photo-test.jpeg',
    '/image/photo-test-2.jpg',
    '/image/photo-test-3.jpg',
    '/image/photo-test-4.jpeg',
    '/image/photo-test-5.jpeg',
    '/image/photo-test.jpeg',
    '/image/photo-test-2.jpg',
    '/image/photo-test-3.jpg',
    '/image/photo-test-4.jpeg',
    '/image/photo-test-5.jpeg',
    '/image/photo-test.jpeg',
    '/image/photo-test-2.jpg',
    '/image/photo-test-3.jpg',
    '/image/photo-test-4.jpeg',
    '/image/photo-test-5.jpeg',
];

export const Photos = () => {
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

    return (
        <div className="photos">
            <Swiper
                loop={true}
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
                                src={image}
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
                                    src={image}
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
