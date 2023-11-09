import './description.scss';

interface DescriptionProps {
    description: string;
}

export const Description: React.FC<DescriptionProps> = ({ description }) => {
    return (
        <div className="advertisement-description">
            <p className="advertisement-description__title">Описание товара</p>
            <p className="advertisement-description__text">
                {description?.length ? description : 'Отсутствует'}
            </p>
        </div>
    );
};
