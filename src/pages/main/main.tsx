import { Advertisement } from '../../components/advertisement/advertisement';
import { SearchBar } from './components/search-bar/search-bar';
import { Title } from './components/title/titile';
import './main.scss';

export const Main = () => {
    return (
        <div className="main">
            <SearchBar />
            <Title />
            <div className="advertisements">
                <Advertisement />
                <Advertisement />
                <Advertisement />
                <Advertisement />
                <Advertisement />
                <Advertisement />
                <Advertisement />
                <Advertisement />
            </div>
        </div>
    );
};
