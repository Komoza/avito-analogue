import './skeleton.style.scss';

export const ProfilePageSkeleton = () => {
    return (
        <div className="profile-page-skeleton">
            <div className="profile-page-skeleton__image"></div>
            <div className="profile-page-skeleton__text-wrap">
                <div className="profile-page-skeleton__name"></div>
                <div className="profile-page-skeleton__city"></div>
                <div className="profile-page-skeleton__tel"></div>
            </div>
        </div>
    );
};
