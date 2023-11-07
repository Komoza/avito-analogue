import './announcement.scss';

export const Announcement = () => {
    return (
        <div className="announcement">
            <img src="/" alt="картинка" className="announcement__image" />

            <div className="announcement__details details">
                <p className="details__description">
                    Ракетка для большого тенниса Triumph Pro ST...
                </p>
                <p className="details__price">2 200 ₽</p>
                <div className="details__from from">
                    <p className="from__location">Санкт Петербург</p>
                    <p className="from__date">Сегодня в 10:45</p>
                </div>
            </div>
        </div>
    );
};
