import { BackToMain } from '../../components/back-to-main/back-to-main';
import { Info } from './components/info/info';
import { MyProduct } from './components/my-product/my-product';
import { Title } from './components/title/title';
import './profile.scss';

export const Profile = () => {
    return (
        <div className="profile__wrapper">
            <BackToMain />
            <Title />
            <Info />
            <MyProduct />
        </div>
    );
};
