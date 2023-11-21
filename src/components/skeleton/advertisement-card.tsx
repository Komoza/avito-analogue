import './skeleton.style.scss';

export const AdvertisementSkeleton = () => {
    return (
        <div className="skeleton-advertisement">
            <div className="skeleton-advertisement__image"></div>
            <div className="skeleton-advertisement__title"></div>
            <div className="skeleton-advertisement__price"></div>
        </div>
    );
};
