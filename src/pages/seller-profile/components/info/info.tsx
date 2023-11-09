import './info.scss';

export const SellerProfileInfo = () => {
    return (
        <div className="seller-profile-info">
            <img
                src="/image/avatar-test.png"
                alt="avatar"
                className="seller-profile-info__avatar"
            />
            <div className="seller-profile-info__data">
                <p className="seller-profile-info__fullname">Кирилл Матвеев</p>
                <p className="seller-profile-info__city">Санкт-Петербург</p>
                <p className="seller-profile-info__start">
                    Продает товары с августа 2021
                </p>
                <button className="seller-profile-info__show-tel blue-button">
                    Показать телефон <br /> 8 905 ХХХ ХХ ХX
                </button>
            </div>
        </div>
    );
};
