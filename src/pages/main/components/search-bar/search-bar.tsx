import './search-bar.scss';

export const SearchBar = () => {
    return (
        <div className="search">
            <img src="/image/logo.svg" alt="логотип" className="search__logo" />
            <form action="" className="search__form form">
                <input
                    name="search-bar"
                    type="text"
                    className="form__input"
                    placeholder="Поиск по объявлениям"
                />
                <button className="form__find blue-button">Найти</button>
            </form>
        </div>
    );
};
