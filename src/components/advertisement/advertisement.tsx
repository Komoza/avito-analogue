import './advertisement.scss';

export const Advertisement = () => {
    return (
        <div className="advertisement-wrap">
            <img
                src="/image/photo-test.jpeg"
                alt="фото объявления"
                className="advertisement-wrap__image"
            />

            <div className="advertisement-wrap__details details">
                <p className="details__name">
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
