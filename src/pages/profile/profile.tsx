import { BackToMain } from '../../components/back-to-main/back-to-main';
import { Info } from './components/info/info';
import { MyProducts } from './components/my-products/my-products';
import { Title } from './components/title/title';
import './profile.scss';

export const Profile = () => {
    return (
        <div className="profile__wrapper">
            <BackToMain />
            <Title />
            <Info />
            <MyProducts />
        </div>
    );
};
