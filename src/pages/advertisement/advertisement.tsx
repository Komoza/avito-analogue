import { BackToMain } from '../../components/back-to-main/back-to-main';
import { Photos } from './components/photos/photos';
import './advertisement.scss';
import { Info } from './components/info/info';
import { Description } from './components/description/dexcription';

export const Advertisement = () => {
    return (
        <div className="advertisement">
            <BackToMain />
            <div className="advertisement-info">
                <Photos />
                <Info />
                <Description />
            </div>
        </div>
    );
};
