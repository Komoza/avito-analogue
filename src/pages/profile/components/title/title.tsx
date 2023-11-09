import './title.scss';

interface TitleProps {
    titleText: string;
}

export const Title: React.FC<TitleProps> = ({ titleText }) => {
    return <p className="profile__title">{titleText}</p>;
};
