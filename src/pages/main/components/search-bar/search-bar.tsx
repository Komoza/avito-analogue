import { useRef } from 'react';
import { Ads } from '../../../../interface/global';
import './search-bar.scss';

interface SearchBarProps {
    setArrAds: (value: Ads[]) => void;
    dataAds: Ads[];
    isMobile?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    setArrAds,
    dataAds,
    isMobile,
}) => {
    const refInput = useRef<HTMLInputElement | null>(null);

    const showFilteredAds = () => {
        setArrAds(
            dataAds.filter((ad) => {
                if (refInput.current) {
                    return ad.title
                        .toLowerCase()
                        .includes(refInput.current.value.toLowerCase());
                }
            })
        );
    };
    const handleClickFind = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        showFilteredAds();
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.value) {
            setArrAds(dataAds);
        } else {
            showFilteredAds();
        }
    };

    return (
        <div className="search">
            <img src="/image/logo.svg" alt="логотип" className="search__logo" />
            <form action="" className="search__form form">
                <input
                    ref={refInput}
                    onChange={(e) => handleChangeInput(e)}
                    name="search-bar"
                    type="text"
                    className="form__input"
                    placeholder={isMobile ? 'Поиск' : 'Поиск по объявлениям'}
                />
                <button
                    onClick={(e) => handleClickFind(e)}
                    className="form__find blue-button"
                >
                    Найти
                </button>
            </form>
        </div>
    );
};
