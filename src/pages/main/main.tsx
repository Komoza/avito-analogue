import { Announcement } from './components/announcement/announcement';
import { SearchBar } from './components/search-bar/search-bar';
import { Title } from './components/title/titile';
import './main.scss';

export const Main = () => {
    return (
        <div className="main">
            <SearchBar />
            <Title />
            <div className="announcements">
                <Announcement />
                <Announcement />
                <Announcement />
                <Announcement />
                <Announcement />
                <Announcement />
                <Announcement />
                <Announcement />
            </div>
        </div>
    );
};
