import './skeleton.style.scss';

export const AdvertisementPageSkeleton = () => {
    return (
        <div className="skeleton-advertisement-page">
            <div className="skeleton-advertisement-page__img-wrap">
                <div className="skeleton-advertisement-page__big-image"></div>
                <div className="skeleton-advertisement-page__small-img-wrap">
                    <div className="skeleton-advertisement-page__small-image"></div>
                    <div className="skeleton-advertisement-page__small-image"></div>
                    <div className="skeleton-advertisement-page__small-image"></div>
                    <div className="skeleton-advertisement-page__small-image"></div>
                    <div className="skeleton-advertisement-page__small-image"></div>
                </div>
            </div>
            <div className="skeleton-advertisement-page__text-wrap">
                <div className="skeleton-advertisement-page__name"></div>
                <div className="skeleton-advertisement-page__date"></div>
                <div className="skeleton-advertisement-page__price"></div>
            </div>
        </div>
    );
};
