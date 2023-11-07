import './info.scss';

export const Info = () => {
    return (
        <div className="info">
            <p className="info__name">
                Ракетка для большого тенниса Triumph Pro STС Б/У
            </p>

            <div className="info__from">
                <p className="info__date">Сегодня в 10:45</p>
                <p className="info__location">Санкт-Петербург</p>
            </div>

            <p className="info__reviews">
                <a>23 отзыва</a>
            </p>

            <div className="info__price">2 200 ₽</div>

            <button className="info__show-phone blue-button">
                Показать телефон <br /> 8 905 ХХХ ХХ ХХ
            </button>

            <div className="info__seller seller">
                <img src="./public/image/avatar-test.png" alt="photo" className="seller__avatar" />
                <div className="seller__info">
                    <p className="seller__name">
                        <a>Кирилл</a>
                    </p>
                    <p className="seller__start">
                        Продает товары с августа 2021
                    </p>
                </div>
            </div>
        </div>
    );
};
