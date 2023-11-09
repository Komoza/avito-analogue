import { Link } from 'react-router-dom';
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
                <Link to={'/advertisement'}>
                    <Advertisement />
                </Link>
                <Link to={'/advertisement'}>
                    <Advertisement />
                </Link>
                <Link to={'/advertisement'}>
                    <Advertisement />
                </Link>
                <Link to={'/advertisement'}>
                    <Advertisement />
                </Link>
                <Link to={'/advertisement'}>
                    <Advertisement />
                </Link>
                <Link to={'/advertisement'}>
                    <Advertisement />
                </Link>
                <Link to={'/advertisement'}>
                    <Advertisement />
                </Link>
                <Link to={'/advertisement'}>
                    <Advertisement />
                </Link>
            </div>
        </div>
    );
};
